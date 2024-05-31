"use client";

import { z } from "zod";
import { ExaminationSpeechSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FolderMinusIcon, FormInput, FormInputIcon } from "lucide-react";
import { createExamination } from "@/actions/examination";
import { toast } from "sonner";

export function ExaminationForm({
  userId,
  patientRecordId,
}: {
  userId: string;
  patientRecordId: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ExaminationSpeechSchema>>({
    resolver: zodResolver(ExaminationSpeechSchema),
    defaultValues: {
      userId: "",
      progressNote: "",
      medicalServices: "",
      prescription: "",
      patientRecordId: "",
      issueAt: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ExaminationSpeechSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.userId = userId;
    values.patientRecordId = patientRecordId;
    // TODO: Fix in the future

    createExamination(values)
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        return toast.success("Created successfully");
      })
      .finally(() => {
        form.clearErrors();
        form.reset();
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-1/3">
        <h2>
          <FolderMinusIcon />
          Create Examniation
        </h2>
        <FormField
          control={form.control}
          name="progressNote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress Note</FormLabel>
              <FormControl>
                <Input placeholder="Progress Note" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="medicalServices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Services</FormLabel>
              <FormControl>
                <Input placeholder="Medical Services" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prescription</FormLabel>
              <FormControl>
                <Input placeholder="Prescription" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
