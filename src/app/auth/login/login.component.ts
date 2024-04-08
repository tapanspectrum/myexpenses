import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { CommanService } from '../../shared/services';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        remembermecheck: new FormControl('')
    });
    submitted = false;

    valCheck: string[] = ['remember'];

    password!: string;

    remembermed: any;
    remberusername: any;

    constructor(
        public layoutService: LayoutService,
        private auth: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private commanservice: CommanService,
        private titleService: Title
    ) {
        this.titleService.setTitle('TP - Login');
        this.remembermed = localStorage.getItem('rememberme');
        this.remberusername = localStorage.getItem('username');
        this.commanservice.getTokenData().subscribe(async (result) => {
            if (result) {
                const tokenvalid = await this.commanservice.isTokenValid();
                if (tokenvalid) {
                    const uData: any = await this.commanservice.getUserData();
                    this.commanservice.runTimeOutInterval(uData);
                    this.selectRoute(uData.role);
                }
            }
        });
    }
    onSubmit() {
        const params = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
        }
        if(this.loginForm.value.remembermecheck) {
            localStorage.setItem('rememberme', this.loginForm.value.remembermecheck);
        }else{
            localStorage.removeItem('rememberme');
            localStorage.removeItem('username');
        }
        this.submitted = true;
        this.auth.login(params).subscribe(
            (result) => {
                this.toastr.success('Success', 'SuccessFully Login !!');
                if (result.data.role === 'Admin') {
                    if(this.loginForm.value.remembermecheck) {
                        localStorage.setItem('username', result.data.username);
                    }
                    sessionStorage.setItem('token', result.data.token);
                    this.router.navigate(['/admin']);
                    this.commanservice
                        .getTokenData()
                        .subscribe(async (result) => {
                            if (result) {
                                const uData: any =  await this.commanservice.getUserData();
                                this.commanservice.runTimeOutInterval(uData);
                                this.commanservice.userIdleState();
                                this.selectRoute(uData.role);
                            }
                        });
                }
            },
            (error) => {
                this.submitted = false;
                this.toastr.error('Error', 'Unauthorized');
            }
        );
    }

    selectRoute(role: string) {
        if (role === 'Admin') {
            this.router.navigate(['/admin']);
        }
    }
}
