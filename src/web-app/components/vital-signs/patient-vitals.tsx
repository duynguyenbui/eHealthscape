"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import * as React from "react";

import { DataTable } from "../data-table";
import { columns } from "./vital-sign-columns";
import { VitalSign } from "@/types";
import { useEffect, useState } from "react";
import { getVitalSignsByHealthRecordId } from "@/actions/vital-sign";
import { formatDate } from "@/lib/utils";

export const PatientVitals = ({
  patientRecordId,
}: {
  patientRecordId?: string;
}) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const modal = useModal();

  useEffect(() => {
    getVitalSignsByHealthRecordId(patientRecordId || "")
      .then((res) => {
        res.data.forEach((vs) => {
          vs.measureAt = formatDate(vs.measureAt);
        });

        setVitalSigns(res.data);
      })
      .catch((err) => setVitalSigns([]));
  }, [patientRecordId]);

  return (
    <div className="flex flex-col">
      <div>
        <Button
          onClick={() => modal.onOpen("create-vital-sign", { patientRecordId })}
          variant="premium"
        >
          Create
        </Button>
      </div>
      <div className="py-5">
        <DataTable columns={columns} data={vitalSigns} />
      </div>
    </div>
  );
};
