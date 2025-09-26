// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class Register {
//   registerData = {
//     username: '',
//     name: '',
//     email: '',
//     password: '',
//     phone: ''
//   };

//   constructor(private router: Router) {}

//   onRegister() {
//     console.log('Registration data:', this.registerData);
    
//     alert('Registration successful!');
//     this.router.navigate(['/login']);
//   }
// }

// For Register Component
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule  // If using ngModel
//   ],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class Register {
//   // component logic
// }


// For Register Component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class Register {
  isSubmitting = false;
  
  registerData = {
    // User type
    userType: '',
    
    // Personal information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    
    // Contact information
    email: '',
    phoneNumber: '',
    address: '',
    
    // Doctor-specific fields
    medicalLicense: '',
    specialization: '',
    yearsOfExperience: '',
    consultationFee: '',
    hospitalAffiliation: '',
    
    // Patient-specific fields
    bloodType: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Security
    password: '',
    confirmPassword: '',
    
    // Agreements
    agreeToTerms: false,
    agreeToDataProcessing: false
  };

  constructor(private router: Router) {}

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    console.log('Registration data:', this.registerData);
    
    // Here you would typically call your authentication service
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Show success message
      alert('Account created successfully! Please check your email for verification.');
      
      // Redirect to login page
      this.router.navigate(['/login']);
    }, 2000);
  }

  // Password validation helper methods
  hasLowercase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasNumber(password: string): boolean {
    return /\d/.test(password);
  }

  hasSpecialChar(password: string): boolean {
    return /[@$!%*?&]/.test(password);
  }
}