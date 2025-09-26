// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.enum';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar'
import { PatientDashboardComponent } from '../patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from '../doctor-dashboard/doctor-dashboard.component';


@Component({
  selector: 'app-dashboard',
   standalone: true,
  imports: [
    CommonModule,      // For common directives
    FormsModule,
    MatButtonModule ,
    ReactiveFormsModule ,
    MatToolbarModule,
    MatFormFieldModule,
    PatientDashboardComponent,
    DoctorDashboardComponent,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule ,
    MatSelectModule        // For ngModel
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  get isDoctor(): boolean {
    return this.currentUser?.role === Role.DOCTOR;
  }

  get isPatient(): boolean {
    return this.currentUser?.role === Role.PATIENT;
  }
}
