import React from "react";
import { columns } from "@/components/examination-columns";
import { DataTable } from "@/components/data-table";
import { getExaminationsRelatedToPatientRecord } from "@/actions/examination";
import { ExaminationFormVoice } from "@/components/examination-form-voice";
import { currentUser } from "@/actions/token";
import { BackButton } from "@/components/back-button";
import Empty from "@/components/empty";

const ExaminationPage = async ({
  params,
}: {
  params: { healthRecordId: string };
}) => {
  const user = await currentUser();

  if (!user) return <Empty />;

  const data = await getExaminationsRelatedToPatientRecord(
    params.healthRecordId || ""
  ).then((res) => res.data || []);

  if (!data) return <Empty />;

  return (
    <div className="flex justify-start flex-col">
      <BackButton />
      <h2 className="text-3xl font-bold tracking-tight text-blue-500">
        <br />
        Examinations
        <span className="text-sm text-muted-foreground ml-2">
          Health Record {params.healthRecordId} 👋
        </span>
      </h2>
      <div className="flex space-x-20 p-4">
        <ExaminationFormVoice
          userId={user.sub!}
          patientRecordId={params.healthRecordId}
        />
      </div>

      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default ExaminationPage;
