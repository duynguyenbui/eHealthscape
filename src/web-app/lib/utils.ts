import { Patient } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB"); // dd/mm/yyyy format
}

export const formatPatients = (patients: Patient[]) => {
  return patients.map((patient) => ({
    ...patient,
    dateOfBirth: formatDate(patient.dateOfBirth),
    bloodType: patient.bloodType.toUpperCase(),
  }));
};