import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
 
  constructor(private authService: AuthService, private router: Router) {}
 
  onSubmit() {
    // Validate the form fields before making the login request
    if (this.email && this.password) {
      const credentials = { email: this.email, password: this.password };
      this.authService.loginUser(credentials).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Redirect to a different route after successful login
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userInformation._id);
          localStorage.setItem('userRole', response.userInformation.role);
          if(response.userInformation.role=='User'){
            this.router.navigate(['/user-dashboard']);
          }else{
            this.router.navigate(['/admin-dashboard']);
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Handle error messages or display to the user
        }
      );
    }
 
  }
}