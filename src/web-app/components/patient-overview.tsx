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
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium text-blue-500">Full Name</h4>
            <p className="text-2xl font-bold text-blue-700">
              {patientRecord.patient.firstName} {patientRecord.patient.lastName}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Date of Birth</h4>
            <p className="text-2xl font-bold text-blue-700">
              {formatDate(patientRecord.patient.dateOfBirth)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Gender</h4>
            <p className="text-2xl font-bold text-blue-700">
              {patientRecord.patient.gender ? "Male" : "Female"}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Blood Type</h4>
            <p className="text-2xl font-bold text-blue-700">
              {patientRecord.patient.bloodType}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Address</h4>
            <p className="text-md font-bold text-blue-700">
              {patientRecord.patient.address}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Phone Number</h4>
            <p className="text-md font-bold text-blue-700">
              {patientRecord.patient.phoneNumber}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Record Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-medium text-blue-500">Nurse ID</h4>
            <p className="text-md font-bold text-blue-700">
              {patientRecord.nurseId}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Created At</h4>
            <p className="text-md font-bold text-blue-700">
              {formatDate(patientRecord.createdAt)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-500">Updated At</h4>
            <p className="text-md font-bold text-blue-700">
              {formatDate(patientRecord.updatedAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

