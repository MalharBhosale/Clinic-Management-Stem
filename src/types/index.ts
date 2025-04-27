// User roles
export enum UserRole {
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist'
}

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

// Patient interface
export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  medicalHistory?: string;
  createdAt: Date;
  lastVisit?: Date;
}

// Token interface
export interface Token {
  id: string;
  number: number;
  patientId: string;
  patientName: string;
  status: 'waiting' | 'consulting' | 'completed';
  createdAt: Date;
  completedAt?: Date;
}

// Prescription interface
export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  medications: Medication[];
  notes?: string;
  createdAt: Date;
}

// Medication interface
export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

// Bill interface
export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  tokenId: string;
  prescriptionId?: string;
  items: BillItem[];
  totalAmount: number;
  status: 'pending' | 'paid';
  createdAt: Date;
  paidAt?: Date;
}

// Bill item interface
export interface BillItem {
  description: string;
  amount: number;
}