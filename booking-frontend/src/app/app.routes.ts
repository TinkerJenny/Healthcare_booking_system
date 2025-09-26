// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
// import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'patient-dashboard', component: PatientDashboardComponent },
//   { path: 'doctor-dashboard', component: DoctorDashboardComponent },
//   { path: '**', redirectTo: '/dashboard' } // Wildcard route for 404 page
// ];

// // OR if you want to go directly to one of the specific dashboards:
// // export const routes: Routes = [
// //   { path: '', redirectTo: '/patient-dashboard', pathMatch: 'full' },
// //   { path: 'patient-dashboard', component: PatientDashboardComponent },
// //   { path: 'doctor-dashboard', component: DoctorDashboardComponent },
// //   { path: '**', redirectTo: '/patient-dashboard' }
// // ];

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './components/appointment-booking/appointment-booking.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'book-appointment', 
    component: AppointmentBookingComponent, 
    canActivate: [AuthGuard],
    data: { role: Role.PATIENT }
  },
  { path: '**', redirectTo: 'login' }  // Fix: redirect to login if unknown route
];
