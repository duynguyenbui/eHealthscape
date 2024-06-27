"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { HealthRecord } from "@/types";

export async function getHealthRecordRelatedToPatient(
  patientId: string
): Promise<HealthRecord | null> {
  try {
    const response = await axiosInterceptorInstance.get(
      `${process.env.HEALTH_RECORD_API_URL}/healthrecords/related/to/patient/${patientId}?api-version=${process.env.HEALTH_RECORD_API_VERSION}`
    );
    const data: HealthRecord = response.data;

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
