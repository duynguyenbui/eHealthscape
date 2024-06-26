"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CareSheet as CareSheetType } from "@/types";
import { getCareSheetRelatedToPatientRecordId } from "@/actions/caresheet";
import { cn, formatDate } from "@/lib/utils";
import { EarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { BackButton } from "@/components/back-button";

const CareSheetPage = ({ params }: { params: { healthRecordId: string } }) => {
  const patientRecordId = params.healthRecordId;
  const { data } = useSession();
  const sub = data?.user.sub;

  const [careSheets, setCareSheets] = useState<CareSheetType[]>([]);
  const modal = useModal();

  useEffect(() => {
    getCareSheetRelatedToPatientRecordId(patientRecordId).then((res) => {
      if (res != null) {
        setCareSheets(res.data || []);
      }
    });
  }, [patientRecordId, modal.isOpen]);

  return (
    <div className="flex flex-col gap-2 p-4">
      <BackButton />
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-blue-500">
          <br />
          Care Sheets
          <span className="text-sm text-muted-foreground ml-2">
            Health Record {patientRecordId} 👋
          </span>
        </h2>
        <Button
          variant="destructive"
          onClick={() =>
            modal.onOpen("create-care-sheet", { patientRecordId, userId: sub })
          }
        >
          Create Care Sheet
        </Button>
      </div>
      <div className="p-5">
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-w-full" // Adjusted width to make the Carousel wider
        >
          <CarouselContent>
            {careSheets.map((careSheet, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className={cn("w-[350px]")}>
                  <CardHeader>
                    <CardTitle>Care Sheet ({index + 1})</CardTitle>
                    <CardDescription>
                      {formatDate(careSheet.issueAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <EarIcon />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Care Instruction
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {careSheet.careInstruction}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Progress Note
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {careSheet.progressNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CareSheetPage;
