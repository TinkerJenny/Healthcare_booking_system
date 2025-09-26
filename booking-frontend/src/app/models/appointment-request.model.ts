// src/app/models/appointment-request.model.ts
export interface AppointmentRequest {
  patient: { id: number };
  doctor: { id: number };
  appointmentDateTime: string;
  reason?: string;
  notes?: string;
}