// src/app/models/user.model.ts
import { Role } from './role.enum';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;  // Optional for display purposes
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
  createdAt?: string;
  specialization?: string;  // For doctors
  licenseNumber?: string;   // For doctors
}