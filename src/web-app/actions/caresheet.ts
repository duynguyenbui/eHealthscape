"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { CareSheet, CareSheetSchema, PaginatedItems } from "@/types";
import { z } from "zod";

export async function createCareSheet(values: z.infer<typeof CareSheetSchema>) {
  const validatedFields = CareSheetSchema.safeParse(values);

  console.log(validatedFields.data);

  if (
    !validatedFields.data?.patientRecordId ||
    !validatedFields.data?.nurseId
  ) {
    return { error: "Missing valuable IDs" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const res = await axiosInterceptorInstance
    .post(
      `${process.env
        .HEALTH_RECORD_API_URL!}/api/healthrecords/caresheets?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`,
      values
    )
    .then((res) => {
      if (res.status == 201) {
        return { success: "Created successfully" };
      } else {
        return { error: "Something went wrong!" };
      }
    })
    .catch((err) => {
      console.error(err);
      return { error: "Something went wrong!" };
    });
}

export async function getCareSheetRelatedToPatientRecordId(
  patientRecordId?: string
): Promise<PaginatedItems<CareSheet>> {
  if (!patientRecordId) {
    throw new Error("Patient record ID is required.");
  }

  try {
    const res = await axiosInterceptorInstance.get(
      `${process.env.HEALTH_RECORD_API_URL}/api/healthrecords/caresheets/related/to/${patientRecordId}?api-version=${process.env.HEALTH_RECORD_API_VERSION}`
    );
    return res.data as PaginatedItems<CareSheet>;
  } catch (error) {
    console.error(error);
    return { data: [], pageSize: 10, pageIndex: 0, count: 0 };
  }
}
