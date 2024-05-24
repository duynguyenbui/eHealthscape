"use client";

import { useEffect, useState } from "react";
import { DeletePatientModal } from "../modals/delete-patient-modal";

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
      <DeletePatientModal />
    </>
  );
};
