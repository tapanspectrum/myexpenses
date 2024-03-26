import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
  } from '@angular/forms';
  import { ToastrService } from 'ngx-toastr';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
      });
      submitted = false;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private auth: AuthService, private toastr: ToastrService) { }
    onSubmit(){
        this.submitted = true;
        this.auth.login(this.loginForm.value).subscribe((result) =>{
            console.log('login', result);
            this.submitted = false; 
            this.toastr.success('Success', 'SuccessFully Login !!');
        },(error) =>{
            this.submitted = false; 
            this.toastr.error('Error', 'Unauthorized');
        });
    }
}
