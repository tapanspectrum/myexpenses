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
    });
    submitted = false;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private auth: AuthService,
        private toastr: ToastrService,
        private router: Router
    ) {}
    onSubmit() {
        this.submitted = true;
        this.auth.login(this.loginForm.value).subscribe(
            (result) => {
                this.toastr.success('Success', 'SuccessFully Login !!');
                if(result.data.role === 'Admin'){
                    sessionStorage.setItem('token', result.data.token);
                    this.router.navigate(['/admin']);
                }
            },
            (error) => {
                this.submitted = false;
                this.toastr.error('Error', 'Unauthorized');
            }
        );
    }
}