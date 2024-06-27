"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Patient, PatientSchema } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getPatientById, updatePatient } from "@/actions/patients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/back-button";

const UpdatePatientPage = ({ params }: { params: { patientId: string } }) => {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    getPatientById(params.patientId).then((data) => setPatient(data));
  }, [params.patientId]);

  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: new Date("2000-01-01"),
      gender: false,
      address: "",
      phoneNumber: "",
      bloodType: "",
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: new Date(patient.dateOfBirth),
        gender: patient.gender,
        address: patient.address,
        phoneNumber: patient.phoneNumber,
        bloodType: patient.bloodType,
      });
    }
  }, [patient, form]);

  function onSubmit(values: z.infer<typeof PatientSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    updatePatient(values).then((data) => {
      if (data?.error) {
        form.reset();
        toast.error(data.error);
      }

      if (data?.success) {
        form.reset();
        router.refresh();
        router.push("/patients");
        toast.success(data?.success);
      }
    });
  }

  return (
    <div className="sm:p-10 md:ml-72 md:mr-72">
      <BackButton className="mb-2 -mt-3 -ml-2" />
      <h1 className="font-bold text-3xl mb-2 text-blue-600">Update Patient</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient&apos;s public first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient&apos;s public last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The patient&apos;s date of birth is used to calculate age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem className="-mt-3">
                  <FormLabel>Blood Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blood type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Please select the patient&apos;s blood type.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{field.value ? "Male" : "Female"}</FormLabel>
                  <FormDescription>
                    Choose the patient&apos;s gender
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Can Tho, VN" {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient&apos;s specific address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0123456789" {...field} />
                </FormControl>
                <FormDescription>
                  This is the patient&apos;s phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePatientPage;
