import { create } from "zustand";

type PerformanceModeType = "low" | "high";

interface PerformanceMode {
  PerformanceMode: PerformanceModeType;
  setPerformanceMode: (PerformanceMode: PerformanceModeType) => void;
}

export const usePerformanceMode = create<PerformanceMode>()((set) => ({
  PerformanceMode: "high",
  setPerformanceMode: (PerformanceMode: PerformanceModeType) =>
    set(() => ({
      PerformanceMode: PerformanceMode,
    })),
}));
