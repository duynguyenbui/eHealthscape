"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { CareSheetSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCareSheet } from "@/actions/caresheet";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CareSheetModal = () => {
  const router = useRouter();
  const modal = useModal();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CareSheetSchema>>({
    resolver: zodResolver(CareSheetSchema),
    defaultValues: {
      progressNote: "",
      careInstruction: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CareSheetSchema>) {
    try {
      // Assign the values to patient record
      values.patientRecordId = modal.data.patientRecordId;
      values.nurseId = modal.data.userId;

      createCareSheet(values)
        .then((res) => {
          if (res?.error) {
            toast.error("Something went wrong");
          }

          return toast.success("Created successfully");
        })
        .catch((err) => toast.error("Something went wrong"));
    } catch (error) {
      console.log(error);
    } finally {
      modal.onClose();
      router.refresh();
    }
  }

  return (
    <Dialog
      open={modal.isOpen && modal.type == "create-care-sheet"}
      onOpenChange={() => {
        form.clearErrors();
        form.reset();
        return modal.onClose();
      }}
    >
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Care Sheet</DialogTitle>
          <DialogDescription>
            Please provide us with necessary information to create the care
            sheet
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="progressNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Progress Note</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Progress Note"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormDescription>Enter progress note value.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careInstruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care Instruction</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Care Instruction"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter care instruction value.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
