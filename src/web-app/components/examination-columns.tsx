"use client";

import { formatDate } from "@/lib/utils";
import { Examination } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Examination>[] = [
  {
    accessorKey: "doctorId",
    header: "Doctor ID",
  },
  {
    accessorKey: "issueAt",
    header: "Issue At",
    accessorFn: (d) => {
      return formatDate(d.issueAt);
    },
  },
  {
    accessorKey: "progressNote",
    header: "Progress Note",
  },
  {
    accessorKey: "medicalServices",
    header: "Medical Services",
  },
  {
    accessorKey: "prescription",
    header: "Prescription",
  },
];
