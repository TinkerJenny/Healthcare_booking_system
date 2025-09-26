// src/app/components/patient-dashboard/patient-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../models/appointment.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-patient-dashboard',
   standalone: true,
  imports: [
    CommonModule,      // For common directives
    FormsModule,
    MatButtonModule ,
    MatIconModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule ,
    MatSelectModule         // For ngModel
  ],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  currentUser: User | null = null;
  loading = false;

  // Add these methods to fix template binding errors
  getPendingAppointmentsCount(): number {
    return this.appointments.filter(a => a.status === 'PENDING').length;
  }
  
  getConfirmedAppointmentsCount(): number {
    return this.appointments.filter(a => a.status === 'CONFIRMED').length;
  }

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadAppointments();
  }

  loadAppointments(): void {
    if (!this.currentUser) return;

    this.loading = true;
    this.appointmentService.getPatientAppointments(this.currentUser.id!).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.loading = false;
      }
    });
  }

  cancelAppointment(appointmentId: number): void {
    // You can implement cancel functionality here
    console.log('Cancel appointment:', appointmentId);
  }
}
