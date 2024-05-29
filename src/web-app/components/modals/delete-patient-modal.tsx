"use client";

import { deletePatient } from "@/actions/patients";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export function DeletePatientModal() {
  const modal = useModal();
  const router = useRouter();

  const onSubmit = () => {
    console.log(modal.data.patientId);

    startTransition(() => {
      deletePatient(modal.data.patientId)
        .then((response) => {
          if (response.success) {
            toast.success(response.success);
            modal.onClose();
            router.refresh(); // Refresh the page or update the state
          } else if (response.error) {
            toast.error(response.error);
            modal.onClose();
          }
        })
        .catch((error) => {
          toast.error("An error occurred while deleting the patient.");
        });
    });
  };

  return (
    <AlertDialog
      open={modal.isOpen && modal.type === "delete-patient"}
      onOpenChange={() => modal.onClose()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            patient&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        Hello
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Create</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
