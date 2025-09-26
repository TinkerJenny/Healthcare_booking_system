// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class Login {
//   loginData = {
//     email: '',
//     password: '',
//     userType: 'patient'
//   };

//   constructor(private router: Router) {}

//   onLogin() {
//     // For now, just navigate to dashboard
//     // Later, you'll integrate with your backend API
//     console.log('Login data:', this.loginData);
    
//     // Store user data temporarily
//     localStorage.setItem('user', JSON.stringify(this.loginData));
    
//     // Navigate to dashboard
//     this.router.navigate(['/dashboard']);
//   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,      // For common directives
//     FormsModule        // For ngModel
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class Login {
//   loginData = {
//     email: '',
//     password: '',
//     userType: ''
//   };

//   // Add your component logic here
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,      // For common directives
    FormsModule        // For ngModel
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  loginData = {
    email: '',
    password: '',
    userType: ''
  };

  onLogin() {
    // Add your login logic here
    console.log('Login attempt:', this.loginData);
    
    // Example login validation
    if (this.loginData.email && this.loginData.password && this.loginData.userType) {
      // Perform authentication
      console.log('Attempting to login with:', this.loginData);
      // Example: call authentication service
      // this.authService.login(this.loginData);
      // this.router.navigate(['/dashboard']);
    } else {
      console.log('Please fill in all fields');
      // Show error message
    }
  }
}