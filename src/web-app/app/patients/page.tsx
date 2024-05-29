import React from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/patient-columns";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn, formatPatients } from "@/lib/utils";
import axiosInterceptorInstance from "@/axios-interceptor-instance";
import { getAllPatients } from "@/actions/patients";

export const revalidate = 0; // revalidate at most every hour

const PatientPage = async () => {
  // TODO: Change this to PaginatedItems
  const patients = await getAllPatients();

  const formattedPatients = formatPatients(patients.data || []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end mr-10 gap-2">
        <Link
          href="/patients/create"
          className={cn(buttonVariants({ variant: "premium" }))}
        >
          <Plus /> Add
        </Link>
      </div>
      <div className="container mx-auto py-10 w-full">
        <DataTable columns={columns} data={formattedPatients} />
      </div>
    </div>
  );
};

export default PatientPage;
