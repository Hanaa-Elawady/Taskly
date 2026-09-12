import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginDto } from '../../models/login-dto';
import { Router } from '@angular/router';
import { AlertToast } from '../../../shared/alert-toast/alert-toast';

@Component({
  imports: [ReactiveFormsModule ,AlertToast],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  isPasswordHidden = true; 
  errorLogin:boolean = false ;
  msg:string =''

  constructor( private _authService:AuthService , private router:Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?!\s+$).+/)]),
    rememberMe: new FormControl(false),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  get rememberMe(){
    return this.loginForm.get('rememberMe');
  }

  onLogin(){
    var dto:LoginDto ={
      email: this.email.value,
      password: this.password.value,
    }
    
    this._authService.postPerAction(`/auth/v1/token?grant_type=password`,dto).subscribe({
      next: (response:any) => {
      this._authService.login(response , this.rememberMe.value); 
      },

      error: (error:any) => {
          this.errorLogin = true;
          this.msg = error.error.msg;
      }
    }); 
  }
}
