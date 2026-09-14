import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { ForgetPassword } from './components/forget-password/forget-password';


export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'sign-up', component: SignUp },
    { path: 'forgot-password', component: ForgetPassword },
];