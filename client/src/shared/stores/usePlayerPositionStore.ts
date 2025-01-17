import { create } from "zustand";
import { Coordinate } from "shared/types/type";

interface PositionState {
  position: Coordinate;
  setPosition: (charPos: Coordinate) => void;
}

export const usePlayerPositionStore = create<PositionState>()((set) => ({
  position: { x: 0, z: 0 },
  setPosition: (charPos) => set(() => ({ position: charPos })),
}));
