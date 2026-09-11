import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup,ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignUpDto } from '../../models/sign-up-dto';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-sign-up',
  styleUrl: './sign-up.css',
  templateUrl: './sign-up.html',
})
export class SignUp implements OnInit {

  isPasswordHidden:boolean = true; 
  errorSignUp:boolean = false ;
  msg:string =''

  constructor(
    private router: Router,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  //#region Form
   signUpForm = new FormGroup(
    {
    name: new FormControl('', [Validators.required , Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)*$/u),Validators.minLength(3),Validators.maxLength(50),]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,64}$/), Validators.minLength(8), Validators.maxLength(64)]),
    confirmPassword: new FormControl('', [Validators.required]),
    jobTitle: new FormControl(''),
    },
    {
      validators: this.passwordsMatchValidator
    }
  );

   passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    const confirmControl = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      confirmControl?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      if (confirmControl?.hasError('passwordsMismatch')) {
        confirmControl.setErrors(null);
      }
      return null;
    }
  }

  
  checkRule(regex: RegExp): boolean {
    const value = this.password?.value || '';
    return regex.test(value);
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get jobTitle() {
    return this.signUpForm.get('jobTitle');
  }
//#endregion

onSignUp(){
  var dto:SignUpDto ={
    email: this.email.value,
    password: this.password.value,
    data: {
      name: this.name.value,
      department: this.jobTitle.value || ''
    }
  }
  this.authService.postPerAction('/auth/v1/signup',dto).subscribe({
    next: (response:any) => {
        this.router.navigate(['/login']); 
    },
    error: (error:any) => {
        this.errorSignUp = true;
        this.msg = error.error.msg;
    }
  });
}
  
}
