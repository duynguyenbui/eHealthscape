import { getHealthRecordRelatedToPatient } from "@/actions/health-record";
import { currentUser } from "@/actions/token";
import { BackButton } from "@/components/back-button";
import Empty from "@/components/empty";
import { PatientOverview } from "@/components/patient-overview";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PatientPage = async ({ params }: { params: { patientId: string } }) => {
  if (!params.patientId) return <Empty />;

  const user = await currentUser();

  if (!user) return <Empty />;

  const patientRecord = await getHealthRecordRelatedToPatient(params.patientId);

  if (!patientRecord) return <Empty />;

  return (
    <div className="mt-2 space-y-2">
      <BackButton />

      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-blue-500">
          <span className="text-xl text-muted-foreground">
            {patientRecord.patient?.firstName} {patientRecord.patient?.lastName}{" "}
          </span>
          <br />
          Health Record
          <span className="text-sm text-muted-foreground ml-2">
            {patientRecord.id} 👋
          </span>
        </h2>
      </div>
      <PatientOverview patientRecord={patientRecord} />

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-blue-500 mb-2">
          Details
        </h1>
        <div className="flex gap-3">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/healthrecords/${patientRecord.id}/vitalsigns`}
          >
            Vital Signs
          </Link>
          <Link
            className={buttonVariants({ variant: "destructive" })}
            href={`/healthrecords/${patientRecord.id}/examinations`}
          >
            Examinations
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/healthrecords/${patientRecord.id}/caresheets`}
          >
            Care Sheets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
