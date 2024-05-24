import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn, formatPatients } from "@/lib/utils";
import axiosInterceptorInstance from "@/axios-interceptor-instance";

export const revalidate = 0; // revalidate at most every hour

const PatientPage = async () => {
  const patients = await axiosInterceptorInstance
    .get(
      `${process.env
        .HEALTH_RECORD_API_URL!}/api/patients/all?PageSize=10&PageIndex=0&api-version=${process
        .env.HEALTH_RECORD_API_VERSION!}`
    )
    .then((res) => res.data.data)
    .catch((err) => console.error(err));

  const formattedPatients = formatPatients(patients || []);

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
