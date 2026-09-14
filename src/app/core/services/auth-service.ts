import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data-service';

@Service()
export class AuthService extends DataService {
    private router = inject(Router);

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
      this.postPerAction('/auth/v1/logout' , {"password": "test123"}).subscribe({
        next:(res:any)=>{
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");    
          localStorage.removeItem('session_expiry');  
          sessionStorage.removeItem("refresh_token");
          sessionStorage.removeItem("access_token");    
          this.router.navigate(['/login']);
        return{
          error:false,
        }
      },
      error: (error:any) => {
        return{
          error:true,
          msg:'Logout failed, please try again.',
        }
      }})
    }
    
    isLogedin(): boolean {
        //Add Check if token still good if not refresh
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
