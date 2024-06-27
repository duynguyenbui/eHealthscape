"use client";

import React from "react";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "@/components/vital-sign-columns";
import { VitalSign } from "@/types";
import { useEffect, useState } from "react";
import { getVitalSignsByHealthRecordId } from "@/actions/vital-sign";
import { formatDate } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import Empty from "@/components/empty";

const VitalSignPage = ({ params }: { params: { healthRecordId: string } }) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const modal = useModal();
  const healthRecordId = params.healthRecordId;

  useEffect(() => {
    getVitalSignsByHealthRecordId(healthRecordId || "")
      .then((res) => {
        res.data.forEach((vs) => {
          vs.measureAt = formatDate(vs.measureAt);
        });

        setVitalSigns(res.data);
      })
      .catch((err) => setVitalSigns([]));
  }, [healthRecordId, modal.isOpen]);

  return (
    <div className="flex flex-col">
      <BackButton />
      <div className="flex items-center space-x-5">
        <h2 className="text-3xl font-bold tracking-tight text-blue-500">
          <br />
          Vital Signs
          <span className="text-sm text-muted-foreground ml-2">
            Health Record {params.healthRecordId} 👋
          </span>
        </h2>
        <Button
          className="mt-4"
          onClick={() =>
            modal.onOpen("create-vital-sign", {
              patientRecordId: healthRecordId,
            })
          }
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

export default VitalSignPage;
