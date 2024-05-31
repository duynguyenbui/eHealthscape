"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { ExaminationSpeechSchema } from "@/types";
import { z } from "zod";

export async function getExaminationsRelatedToPatientRecord(
  patientRecordId: string
) {
  const data = await axiosInterceptorInstance
    .get(
      `${process.env
        .HEALTH_RECORD_API_URL!}/api/healthrecords/examinations/related/to/${patientRecordId}?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    )
    .then((res) => res.data)
    .catch((err) => console.error(err));

  if (data) return data;
  else return null;
}

export async function createExamination(
  values: z.infer<typeof ExaminationSpeechSchema>
) {
  console.log(values);

  const validatedFields = ExaminationSpeechSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  if (!validatedFields.data?.patientRecordId || !validatedFields.data.userId) {
    return { error: "Missing Data" };
  }

  const res = await axiosInterceptorInstance
    .post(
      `${process.env
        .SPEECH_RECOGNITION_API_URL!}/api/speech-completion?api-version=${process
        .env.SPEECH_RECOGNITION_API_VERSION!}`,
      values
    )
    .then((res) => {
      if (res.status === 200) {
        return { success: "Created successfully" };
      }

      return { error: "Something went wrong" };
    })
    .catch((err) => {
      console.log(err);
      return { error: "Encountering error when creating data" };
    });
}
