"use server";

import axiosInterceptorInstance from "@/axios-interceptor-instance";

export async function getExaminationsRelatedToPatientRecord(
  patientRecordId: string
) {
  const data = await axiosInterceptorInstance
    .get(
      `${process.env
        .HEALTH_RECORD_API_URL!}/healthrecords/examinations/related/to/${patientRecordId}?api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    )
    .then((res) => res.data)
    .catch((err) => console.error(err));

  if (data) return data;
  else return null;
}

export async function createExamination(values: any) {
  if (!values) return { error: "Missing values" };

  try {
    const res = await axiosInterceptorInstance.post(
      `${process.env.SPEECH_RECOGNITION_API_URL}/speech-completion?api-version=${process.env.SPEECH_RECOGNITION_API_VERSION}`,
      values
    );

    if (res.status === 403) {
      return { error: "Forbidden" };
    } else if (res.status === 200) {
      return { success: "Created successfully" };
    } else {
      return { error: "Something went wrong" };
    }
  } catch (err) {
    console.error("Encountering error when creating data:", err);
    return { error: "Something went wrong due to an error" };
  }
}
