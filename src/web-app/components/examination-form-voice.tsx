"use client";

import React, { useState } from "react";
import VoiceInput from "./voice-input";
import { Button } from "./ui/button";
import { createExamination } from "@/actions/examination";
import { toast } from "sonner";

export const ExaminationFormVoice = ({
  userId,
  patientRecordId,
}: {
  userId: string;
  patientRecordId: string;
}) => {
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
        }

        return toast.success("Created successfully");
      })
      .catch((err) => toast.error("Something went wrong"))
      .finally(() => {
        setProgressNote("");
        setMedicalServices("");
        setPrescription("");
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

      <Button type="submit" variant="premium">
        Submit
      </Button>
    </form>
  );
};
