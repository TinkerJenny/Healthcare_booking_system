// // src/app/components/doctor-dashboard/doctor-dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { AppointmentService } from '../../services/appointment.service';
// import { AuthService } from '../../services/auth.service';
// import { Appointment } from '../../models/appointment.model';
// import { AppointmentStatus } from '../../models/appointment-status.enum';
// import { User } from '../../models/user.model';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';



// @Component({
//   selector: 'app-doctor-dashboard',
//    standalone: true,
//   imports: [
//     CommonModule,      // For common directives
//     FormsModule,
//     MatButtonModule ,
//     ReactiveFormsModule ,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatProgressSpinnerModule,
//     MatCardModule ,
//     MatSelectModule         // For ngModel
//   ],
//   templateUrl: './doctor-dashboard.component.html',
//   styleUrls: ['./doctor-dashboard.component.css']
// })
// export class DoctorDashboardComponent implements OnInit {
//   appointments: Appointment[] = [];
//   currentUser: User | null = null;
//   loading = false;

//   constructor(
//     private appointmentService: AppointmentService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.currentUser = this.authService.currentUserValue;
//     this.loadAppointments();
//   }

//   loadAppointments(): void {
//     if (!this.currentUser) return;

//     this.loading = true;
//     this.appointmentService.getDoctorAppointments(this.currentUser.id!).subscribe({
//       next: (appointments) => {
//         this.appointments = appointments;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error loading appointments:', err);
//         this.loading = false;
//       }
//     });
//   }

//   updateAppointmentStatus(appointmentId: number, status: AppointmentStatus): void {
//     this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
//       next: (updatedAppointment) => {
//         // Update the local appointment list
//         const index = this.appointments.findIndex(a => a.id === appointmentId);
//         if (index !== -1) {
//           this.appointments[index] = updatedAppointment;
//         }
//         this.snackBar.open('Appointment status updated!', 'Close', {
//           duration: 3000,
//           panelClass: ['success-snackbar']
//         });
//       },
//       error: (err) => {
//         this.snackBar.open('Failed to update appointment status', 'Close', {
//           duration: 3000,
//           panelClass: ['error-snackbar']
//         });
//       }
//     });
//   }
// }

// src/app/components/doctor-dashboard/doctor-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = []; // Replace with your actual Appointment type
  loading = false;

  ngOnInit() {
    // Initialize your component data
    this.loadAppointments();
  }

  loadAppointments() {
    // Your existing appointment loading logic
  }

  // Helper methods for template
  getTotalAppointments(): number {
    return this.appointments.length;
  }

  getPendingAppointments(): number {
    return this.appointments.filter(a => a.status === 'PENDING').length;
  }

  getConfirmedAppointments(): number {
    return this.appointments.filter(a => a.status === 'CONFIRMED').length;
  }

  getCompletedAppointments(): number {
    return this.appointments.filter(a => a.status === 'COMPLETED').length;
  }

  updateAppointmentStatus(appointmentId: string, status: string) {
    // Your existing status update logic
    console.log(`Updating appointment ${appointmentId} to status: ${status}`);
    // Implement your update logic here
  }
}