import { type ReactNode, type MouseEvent } from "react";
import { create } from "zustand";

interface DialogState {
  dialog: ReactNode | undefined;
  isOpen: boolean;
  setDialog: (dialogComponent: ReactNode) => void;
  setDialogOpen: () => void;
  setDialogClose: () => void;
  setDialogBackdrop: (e: MouseEvent<HTMLElement>) => void;
}

export const useDialogStore = create<DialogState>()((set) => ({
  dialog: undefined,
  isOpen: false,
  setDialog: (dialogComponent) =>
    set(() => ({
      dialog: dialogComponent,
    })),
  setDialogOpen: () =>
    set(() => ({
      isOpen: true,
    })),
  setDialogClose: () => set(() => ({ isOpen: false })),
  setDialogBackdrop: (e: MouseEvent<HTMLElement>) =>
    set(() => {
      return e.target === e.currentTarget
        ? { isOpen: false }
        : { isOpen: true };
    }),
}));
