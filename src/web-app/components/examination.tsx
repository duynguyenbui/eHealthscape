import React from "react";
import { ExaminationForm } from "./examination-form";
import { columns } from "./examination-columns";
import { DataTable } from "./data-table";
import RecordSpeech from "./recognition";
import { getExaminationsRelatedToPatientRecord } from "@/actions/examination";

export const Examination = async ({
  userId,
  patientRecordId,
}: {
  userId: string;
  patientRecordId: string;
}) => {
  const data = await getExaminationsRelatedToPatientRecord(
    patientRecordId || ""
  ).then((res) => res.data);

  return (
    <div className="flex justify-start gap-10 flex-col">
      <div className="flex space-x-20 p-4">
        <ExaminationForm userId={userId} patientRecordId={patientRecordId} />
        <RecordSpeech />
      </div>

      <DataTable columns={columns} data={data || []} />
    </div>
  );
};
