// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
   standalone: true,
  imports: [
    CommonModule,      // For common directives
    FormsModule,
    MatButtonModule ,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule ,
    MatSelectModule         // For ngModel
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  roles = Object.values(Role);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      role: ['', Validators.required],
      specialization: [''],
      licenseNumber: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const userData: User = this.registerForm.value;

    this.userService.registerUser(userData).subscribe({
      next: (user) => {
        console.log('User registered successfully:', user);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error || 'Registration failed';
        this.loading = false;
      }
    });
  }

  get isDoctor(): boolean {
    return this.registerForm.get('role')?.value === Role.DOCTOR;
  }
}
