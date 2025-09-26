// // src/app/components/login/login.component.ts
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from '../../services/user.service';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../../models/user.model';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { provideHttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatButtonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatProgressSpinnerModule,
//     MatCardModule,
//     MatSelectModule
//   ],
//   providers: [
//     // Add providers for standalone component
//     UserService,
//     AuthService
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   loading = false;
//   error = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     this.error = '';

//     const { username, password } = this.loginForm.value;

//     // Since your backend doesn't have a login endpoint, 
//     // we'll simulate login by finding user by username
//     // In a real app, you'd have a proper authentication endpoint
//     this.userService.getDoctors().subscribe({
//       next: (doctors) => {
//         const doctor = doctors.find(d => d.username === username);
//         if (doctor) {
//           // In real app, verify password here
//           this.authService.login(doctor);
//           this.router.navigate(['/dashboard']);
//         } else {
//           // Check patients
//           this.userService.getPatients().subscribe({
//             next: (patients) => {
//               const patient = patients.find(p => p.username === username);
//               if (patient) {
//                 this.authService.login(patient);
//                 this.router.navigate(['/dashboard']);
//               } else {
//                 this.error = 'Invalid username or password';
//               }
//               this.loading = false;
//             },
//             error: (err) => {
//               this.error = 'Login failed';
//               this.loading = false;
//             }
//           });
//         }
//       },
//       error: (err) => {
//         this.error = 'Login failed';
//         this.loading = false;
//       }
//     });
//   }
// }



// src/app/components/login/login.component.ts - Clean version without providers
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, password } = this.loginForm.value;

    // Since your backend doesn't have a login endpoint, 
    // we'll simulate login by finding user by username
    // In a real app, you'd have a proper authentication endpoint
    this.userService.getDoctors().subscribe({
      next: (doctors) => {
        const doctor = doctors.find(d => d.username === username);
        if (doctor) {
          // In real app, verify password here
          this.authService.login(doctor);
          this.router.navigate(['/dashboard']);
        } else {
          // Check patients
          this.userService.getPatients().subscribe({
            next: (patients) => {
              const patient = patients.find(p => p.username === username);
              if (patient) {
                this.authService.login(patient);
                this.router.navigate(['/dashboard']);
              } else {
                this.error = 'Invalid username or password';
              }
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Login failed';
              this.loading = false;
            }
          });
        }
      },
      error: (err) => {
        this.error = 'Login failed';
        this.loading = false;
      }
    });
  }
}