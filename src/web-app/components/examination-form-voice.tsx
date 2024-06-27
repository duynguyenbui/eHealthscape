"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createExamination } from "@/actions/examination";
import VoiceInput from "./voice-input";
import { Button } from "./ui/button";

export const ExaminationFormVoice = ({
  userId,
  patientRecordId,
}: {
  userId: string;
  patientRecordId: string;
}) => {
  const router = useRouter();
  const [progressNote, setProgressNote] = useState<string>("");
  const [medicalServices, setMedicalServices] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values = {
      progressNote,
      medicalServices,
      prescription,
      userId,
      patientRecordId,
    };

    createExamination(values)
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        } else if (res?.success) {
          toast.success(res.success);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setProgressNote("");
        setMedicalServices("");
        setPrescription("");

        router.push(`/healthrecords/${patientRecordId}/examinations`);
        router.refresh();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:w-fit md:w-[500px]"
    >
      <VoiceInput
        label="Progress Note"
        value={progressNote}
        onChange={setProgressNote}
      />
      <VoiceInput
        label="Medical Services"
        value={medicalServices}
        onChange={setMedicalServices}
      />
      <VoiceInput
        label="Prescription"
        value={prescription}
        onChange={setPrescription}
      />

      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  );
};
