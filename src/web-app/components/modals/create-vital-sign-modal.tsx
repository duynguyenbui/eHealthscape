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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { VitalSignSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createVitalSign } from "@/actions/vital-sign";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CreateVitalSignModal = () => {
  const router = useRouter();
  const modal = useModal();

  // 1. Define your form.
  const form = useForm<z.infer<typeof VitalSignSchema>>({
    resolver: zodResolver(VitalSignSchema),
    defaultValues: {
      pulse: 0,
      bloodPressure: 0,
      temperature: 0,
      spo2: 0,
      respirationRate: 0,
      height: 0,
      weight: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof VitalSignSchema>) {
    try {
      // Assign the values to patient record
      // TODO: Fix this issue in the future
      values.patientRecordId = modal.data.patientRecordId;
      console.log(values);

      await createVitalSign(values)
        .then((res) => {
          if (res.success) {
            toast.success(res.success);
          }

          if (res.error) {
            toast.error(res.error);
          }
        })
        .catch((err) => toast.error("Something went wrong"))
        .finally(() => router.refresh());
    } catch (error) {
      console.log(error);
    } finally {
      modal.onClose();
      router.refresh();
    }
  }

  return (
    <Dialog
      open={modal.isOpen && modal.type == "create-vital-sign"}
      onOpenChange={() => {
        form.clearErrors();
        form.reset();
        return modal.onClose();
      }}
    >
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Vital Signs</DialogTitle>
          <DialogDescription>
            Please provide us with necessary information to create the vital
            sign
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="pulse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pulse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pulse value"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>Enter the pulse value.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter blood pressure value"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the blood pressure value.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter temperature value"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the temperature value.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spo2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spo2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Spo2 value"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>Enter the Spo2 value.</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="respirationRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respiration Rate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter respiration rate value"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter height value"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter weight value"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
