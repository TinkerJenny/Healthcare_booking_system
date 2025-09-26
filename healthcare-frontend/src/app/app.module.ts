import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// Import standalone components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { AppointmentBooking } from './components/appointment-booking/appointment-booking.component';
import { AppointmentList } from './components/appointment-list/appointment-list.component';
import { DoctorSchedule} from './components/doctor-schedule/doctor-schedule.component';

@NgModule({
  declarations: [
    // Remove all standalone components from declarations
    // Only declare non-standalone components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Import standalone components here instead
    AppComponent,
    Login,
    Register,
    Dashboard,
    AppointmentBooking,
    AppointmentList,
    DoctorSchedule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }