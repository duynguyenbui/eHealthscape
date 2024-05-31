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
  patient?: Patient;
  examinations: any[];
  careSheets: any[];
  vitalSigns: any[];
}

export interface CareSheet {
  id: string;
  nurseId: string;
  issueAt: string;
  progressNote: string;
  careInstruction: string;
  patientRecordId: string;
  patientRecord: any;
}

export interface VitalSign {
  id: string;
  pulse: number;
  bloodPressure: number;
  temperature: number;
  spo2: number;
  respirationRate: number;
  height: number;
  weight: number;
  measureAt: string;
  nurseId: string;
  patientRecordId: string;
  patientRecord: any;
}

export interface PaginatedItems<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export interface Examination {
  id: string;
  doctorId: string;
  issueAt: string;
  progressNote: string;
  medicalServices: string;
  prescription: string;
  patientRecordId: string;
  patientRecord: any;
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

export const VitalSignSchema = z.object({
  pulse: z.coerce.number(),
  bloodPressure: z.coerce.number(),
  temperature: z.coerce.number(),
  spo2: z.coerce.number(),
  respirationRate: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(), // SOLUTION
  patientRecordId: z.string().optional(),
});

export const CareSheetSchema = z.object({
  progressNote: z.string().min(1, { message: "Missing Progress Note" }),
  careInstruction: z.string().min(1, { message: "Missing Care Instruction" }),
  patientRecordId: z.string().optional(),
  nurseId: z.string().optional(),
});

export const ExaminationSpeechSchema = z.object({
  userId: z.string().optional(),
  progressNote: z.string(),
  medicalServices: z.string(),
  prescription: z.string(),
  patientRecordId: z.string().optional(),
  issueAt: z.date().optional(),
});
