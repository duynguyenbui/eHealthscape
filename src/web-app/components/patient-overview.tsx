import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HealthRecord } from "@/types";
import { formatDate } from "@/lib/utils";

export const PatientOverview = ({
  patientRecord,
}: {
  patientRecord: HealthRecord;
}) => {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium">Full Name</h4>
            <p className="text-2xl font-bold">
              {patientRecord.patient?.firstName}{" "}
              {patientRecord.patient?.lastName}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Date of Birth</h4>
            <p className="text-2xl font-bold">
              {formatDate(patientRecord.patient?.dateOfBirth)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Gender</h4>
            <p className="text-2xl font-bold">
              {patientRecord.patient?.gender ? "Male" : "Female"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Blood Type</h4>
            <p className="text-2xl font-bold ">
              {patientRecord.patient?.bloodType}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium ">Address</h4>
            <p className="text-md font-bold ">
              {patientRecord.patient?.address}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Phone Number</h4>
            <p className="text-md font-bold">
              {patientRecord.patient?.phoneNumber}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Record Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium">Nurse ID</h4>
            <p className="text-md font-bold">{patientRecord.nurseId}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Created At</h4>
            <p className="text-md font-bold">
              {formatDate(patientRecord.createdAt)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Updated At</h4>
            <p className="text-md font-bold">
              {formatDate(patientRecord.updatedAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
