import { create } from "zustand";

export type ModalType =
  | "delete-patient"
  | "create-vital-sign"
  | "create-care-sheet";

interface Modal {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
  data: any;
}

export const useModal = create<Modal>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
