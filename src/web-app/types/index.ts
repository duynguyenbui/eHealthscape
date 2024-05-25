import { z } from "zod";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: boolean;
  address: string;
  phoneNumber: string;
  bloodType: string;
}

export interface HealthRecord {
  id: string;
  nurseId: string;
  createdAt: string;
  updatedAt: string;
  patientId: string;
  patient: Patient;
  examinations: any[];
  careSheets: any[];
  vitalSigns: any[];
}

export const PatientSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.boolean(),
  address: z.string().min(1, { message: "Address is required." }),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  bloodType: z.string({
    required_error: "Blood type is required.",
  }),
});
