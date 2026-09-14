import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { UserDataDto } from '../../core/models/user-models/user-data-dto';
import { CommonModule } from '@angular/common';
import { AlertToast } from '../../shared/component/alert-toast/alert-toast';

@Component({
  imports: [RouterOutlet ,CommonModule ,AlertToast],
  selector: 'app-dashboard-layout',
  styleUrl: './dashboard-layout.css',
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout implements OnInit{
  isCollapsed :boolean= false;
  viewData:boolean=false;
  error:boolean=false;
  errorMsg:string="";
  userData:UserDataDto={
    department:"",
    name:"",
    nameInitials:"",
  };
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.getUserData();

  }

  getInitials(text: string): string {
  const cleanedText = text.trim().replace(/\s+/g, ' ');
  if (!cleanedText) return '';

  if (cleanedText.includes(' ')) {
    const words = cleanedText.split(' ');
    const firstLetter = words[0].charAt(0);
    const secondLetter = words[1].charAt(0);
    return (firstLetter + secondLetter).toUpperCase();
  } 
  
  return cleanedText.substring(0, 2).toUpperCase();
  }

  getUserData(){
      this.authService.get('/auth/v1/user').subscribe({
      next: (response:any) => {
        this.userData = {
          department : response.user_metadata.department,
          name : response.user_metadata.name,
          nameInitials : this.getInitials(response.user_metadata.name)
        }
        this.viewData =true;

      },
      error: (error:any) => {
          this.error = true;
          this.errorMsg = error.error.msg;
      }
    }); 
  }

  logOut(){
    var lougedOut:any= this.authService.logout();
    if(lougedOut?.error){
      this.error = lougedOut.error;
      setTimeout(() => {
        this.error = false;
      }, 5000); 
      this.errorMsg = lougedOut.msg
    }

  }

}
