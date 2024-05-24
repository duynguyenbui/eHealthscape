"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { Patient, PatientSchema } from "@/types";
import axios from "axios";
import { z } from "zod";

export async function createPatient(values: z.infer<typeof PatientSchema>) {
  const validatedFields = PatientSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    bloodType,
  } = validatedFields.data;

  const res = await axiosInterceptorInstance
    .post(
      `${process.env.HEALTH_RECORD_API_URL!}/api/patients?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`,
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        bloodType,
      }
    )
    .then((res) => res.status)
    .catch((err) => console.error(err));

  if (res == 201)
    return {
      success: "Create Successfully",
    };

  return { error: "Something went wrong!" };
}

export async function getPatientById(patientId: string): Promise<Patient> {
  const data = await axiosInterceptorInstance
    .get(
      `${process.env
        .HEALTH_RECORD_API_URL!}/api/patients/${patientId}?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    )
    .then((res) => res.data)
    .catch((err) => console.error(err));
  return data;
}

export async function updatePatient(values: z.infer<typeof PatientSchema>) {
  const validatedFields = PatientSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    id,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    bloodType,
  } = validatedFields.data;

  const res = await axiosInterceptorInstance
    .put(
      `${process.env.HEALTH_RECORD_API_URL!}/api/patients?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`,
      {
        id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        bloodType,
      }
    )
    .then((res) => res.status)
    .catch((err) => console.error(err));

  if (res == 201)
    return {
      success: "Update Successfully",
    };

  return { error: "Something went wrong!" };
}

// Adjusted the deletePatient function for better error handling
export async function deletePatient(patientId: string) {
  try {
    const res = await axiosInterceptorInstance.delete(
      `${process.env
        .HEALTH_RECORD_API_URL!}/api/patients/${patientId}?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    );

    if (res.status === 204) {
      return { success: "Patient deleted successfully" };
    }
    return { error: "Unexpected status code returned: " + res.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { error: "Patient not found" };
      }
      return { error: `Error: ${error.response?.statusText}` };
    }
    return { error: "An unknown error occurred" };
  }
}
