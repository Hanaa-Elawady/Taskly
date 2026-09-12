import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../enviroment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private url = environment.apiUrl;
    private apiKey = environment.apiKey;

    postPerAction(action: string, resource: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'apikey': this.apiKey,
            'Authorization': `Bearer ${this.apiKey}`
        });

        return this.http.post(this.url + action, resource, { headers: headers})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                return throwError(() => error);})
            );
    }


    login(response:any ,rememberMe:boolean){
        if(rememberMe){
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token); 
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          localStorage.setItem('session_expiry', expiryDate.toISOString());
        }else{
          sessionStorage.setItem('access_token', response.access_token);
          sessionStorage.setItem('refresh_token', response.refresh_token); 
        }

        this.router.navigate(['/project']);

    }

    logout() {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");    
      localStorage.removeItem('user-name');
      localStorage.removeItem('session_expiry');  
      this.router.navigate(['/login']);

    }

    
    isLogedin(): boolean {
      const sessionToken = sessionStorage.getItem('access_token');
      if (sessionToken) {
        return true;
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        return false;
      }

      const expirationDatestring = localStorage.getItem('session_expiry');
      if (!expirationDatestring) {
        return false; 
      }

      const expirationDate = new Date(expirationDatestring);
      return new Date() < expirationDate;
    }


    refreshToken(): void {
      const refreshToken = localStorage.getItem('refresh_token');
      
      const credentials = { 
        refresh_token: refreshToken 
      };
      this.postPerAction('/auth/v1/token?grant_type=refresh_token' , credentials).subscribe({
      next: (response:any) => {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");  
      localStorage.setItem("refresh_token" , response.access_token);
      localStorage.setItem("access_token",response.refresh_token);  
      }});
    }

}
