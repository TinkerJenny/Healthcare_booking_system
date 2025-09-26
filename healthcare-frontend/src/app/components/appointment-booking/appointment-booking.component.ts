// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-appointment-booking',
//   templateUrl: './appointment-booking.component.html',
//   styleUrls: ['./appointment-booking.component.css']
// })
// export class AppointmentBooking {
//   appointmentData = {
//     doctor: '',
//     date: '',
//     time: '',
//     reason: ''
//   };

//   constructor(private router: Router) {}

//   onSubmit() {
//     console.log('Booking appointment:', this.appointmentData);
//     // Here you would typically send to your backend
//     alert('Appointment booked successfully!');
//     this.router.navigate(['/appointments']);
//   }
// }
// For AppointmentBooking Component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule  // If using ngModel
  ],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBooking {
  // component logic
}