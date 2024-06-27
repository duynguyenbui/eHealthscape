"use client";

import { useEffect, useState } from "react";
import { DeletePatientModal } from "../modals/delete-patient-modal";
import { CreateVitalSignModal } from "../modals/create-vital-sign-modal";
import { CareSheetModal } from "../modals/create-care-sheet-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CareSheetModal />
      <CreateVitalSignModal />
      <DeletePatientModal />
    </>
  );
};
