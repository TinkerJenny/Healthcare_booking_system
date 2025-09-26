import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { AppointmentBooking } from './components/appointment-booking/appointment-booking.component';
import { AppointmentList } from './components/appointment-list/appointment-list.component';
import { DoctorSchedule } from './components/doctor-schedule/doctor-schedule.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'book-appointment', component: AppointmentBooking },
  { path: 'appointments', component: AppointmentList },
  { path: 'doctor-schedule', component: DoctorSchedule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }