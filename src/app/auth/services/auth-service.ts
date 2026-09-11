import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
                catchError(this.handleError)
            );
    }
  
    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error(error.message || 'Server Error'));
    }

    login(response:any ,rememberMe:boolean){
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token); 
        localStorage.setItem('user-name', response.user.user_metadata.name);
        if(rememberMe){
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          localStorage.setItem('session_expiry', expiryDate.toISOString());
        }else{
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 1);
          localStorage.setItem('session_expiry', expiryDate.toISOString()); 
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
      const token = localStorage.getItem('access_token');
      if (!token) {
        return false;
      }

      const expirationDatestring = localStorage.getItem('session_expiry');
      if (!expirationDatestring) {
        return false; 
      }

      const expirationDate = new Date(expirationDatestring);

      if (isNaN(expirationDate.getTime())) {
        return false;
      }
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
