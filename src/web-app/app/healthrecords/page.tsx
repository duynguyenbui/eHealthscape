import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

const HealthRecordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl w-full flex flex-col justify-center items-center gap-9 p-2">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-blue-800 font-bold">
            About Health Record Service
          </h1>
          <Link href="/patients" className="text-blue-400 underline">
            Proceed
          </Link>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-2xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className="text-blue-500">Medical History</h2>
            </AccordionTrigger>
            <AccordionContent>
              Review the patient&apos;s past medical conditions, surgeries, and
              other significant health events.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h2 className="text-red-500">Current Medications</h2>
            </AccordionTrigger>
            <AccordionContent>
              Access a list of medications the patient is currently taking,
              including dosages and schedules.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h2 className="text-green-500">Previous Diagnoses</h2>
            </AccordionTrigger>
            <AccordionContent>
              View a record of past diagnoses made by healthcare professionals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full max-w-2xl mt-6">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/health-record.webp"
              fill
              alt="Health Record Image"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordPage;
