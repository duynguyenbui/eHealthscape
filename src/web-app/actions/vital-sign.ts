"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { PaginatedItems, VitalSign, VitalSignSchema } from "@/types";
import { date, z } from "zod";

export async function createVitalSign(values: z.infer<typeof VitalSignSchema>) {
  const validatedFields = VitalSignSchema.safeParse(values);

  console.log(validatedFields.data);

  if (!validatedFields.data?.patientRecordId) {
    return { error: "Missing patient record ID" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const res = await axiosInterceptorInstance
    .post(
      `${process.env
        .HEALTH_RECORD_API_URL!}/healthrecords/vitalsigns?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`,
      values
    )
    .then((res) => res.status)
    .catch((err) => console.error(err));

  if (res == 201)
    return {
      success: "Create Vital Sign Successfully",
    };

  return { error: "Something went wrong!" };
}

export async function getVitalSignsByHealthRecordId(
  healthRecordId: string
): Promise<PaginatedItems<VitalSign>> {
  const res = await axiosInterceptorInstance
    .get(
      `${process.env
        .HEALTH_RECORD_API_URL!}/healthrecords/vitalsigns/${healthRecordId}?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }

      return {};
    })
    .catch((err) => console.error(err));

  return res as PaginatedItems<VitalSign>;
}
