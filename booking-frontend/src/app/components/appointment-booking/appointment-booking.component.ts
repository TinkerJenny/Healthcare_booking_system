// src/app/components/appointment-booking/appointment-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AppointmentRequest } from '../../models/appointment-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-appointment-booking',
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
    MatSelectModule     
  ],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: User[] = [];
  loading = false;
  currentUser: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.appointmentForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.userService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid || !this.currentUser) {
      return;
    }

    this.loading = true;
    
    const formValue = this.appointmentForm.value;
    const appointmentDateTime = new Date(
      formValue.appointmentDate + 'T' + formValue.appointmentTime
    ).toISOString();

    const appointmentRequest: AppointmentRequest = {
      patient: { id: this.currentUser.id! },
      doctor: { id: formValue.doctorId },
      appointmentDateTime: appointmentDateTime,
      reason: formValue.reason,
      notes: formValue.notes
    };

    this.appointmentService.createAppointment(appointmentRequest).subscribe({
      next: (appointment) => {
        this.snackBar.open('Appointment booked successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.appointmentForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error || 'Failed to book appointment', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }
}
