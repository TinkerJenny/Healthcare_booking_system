// src/app/models/appointment.model.ts
import { User } from './user.model';
import { AppointmentStatus } from './appointment-status.enum';

export interface Appointment {
  id?: number;
  patient: User;
  doctor: User;
  appointmentDateTime: string;  // ISO string format
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}