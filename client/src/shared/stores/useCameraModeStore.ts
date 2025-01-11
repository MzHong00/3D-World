import { create } from "zustand";

interface ModeState {
  modeState: boolean;
  setModeState: (mode: boolean) => void;
}

export const useCameraModeStore = create<ModeState>()((set) => ({
  modeState: true,
  setModeState: (mode) => set(() => ({ modeState: mode })),
}));
