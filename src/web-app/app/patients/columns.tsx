"use client";

import { Patient } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "./action-menu";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "DoB",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "bloodType",
    header: "Blood Type",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;
      return <ActionMenu patient={patient} />;
    },
  },
];
