"use client";

import { VitalSign } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<VitalSign>[] = [
  {
    accessorKey: "nurseId",
    header: "Nurse Id",
  },
  {
    accessorKey: "pulse",
    header: "Pulse",
  },
  {
    accessorKey: "bloodPressure",
    header: "Blood Pressure",
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
  },
  {
    accessorKey: "spo2",
    header: "Spo2",
  },
  {
    accessorKey: "respirationRate",
    header: "Respiration Rate",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "measureAt",
    header: "Measure At",
  },
];
