import React from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/patient-columns";
import { buttonVariants } from "@/components/ui/button";
import { ArrowBigLeft, Plus } from "lucide-react";
import Link from "next/link";
import { cn, formatPatients } from "@/lib/utils";
import { getAllPatients } from "@/actions/patients";
import { BackButton } from "@/components/back-button";
import { currentUser } from "@/actions/token";
import Empty from "@/components/empty";

export const revalidate = 0;

const PatientPage = async () => {
  const user = await currentUser();

  if (!user) return <Empty />;

  const patients = await getAllPatients();

  const formattedPatients = formatPatients(patients?.data || []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mr-10 gap-2">
        <BackButton className="ml-8" />
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
