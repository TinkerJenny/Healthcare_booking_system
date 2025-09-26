// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-doctor-schedule',

//   templateUrl: './doctor-schedule.component.html',
//   styleUrl: './doctor-schedule.component.css'
// })
// export class DoctorSchedule {

// }
// For DoctorSchedule Component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css']
})
export class DoctorSchedule {
  // component logic
}
