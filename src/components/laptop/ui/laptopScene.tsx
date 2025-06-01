import { GroupProps } from "@react-three/fiber";

import { LaptopZoneTable } from "./laptopZoneTable";

import { SeatedPlayer } from "components/player/ui/seatedPlayer";
import { ChairInstance } from "shared/ui/Chair/chairInstance";
import type { SeatState } from "shared/types/type";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";

import { ITEMS_PER_LINE } from "..";
import { useSeatedPlayerPosition } from "../models/useSeatedPlayerPosition";
import { useChairPerformancePosition } from "../models/useChairPerformancePosition";

interface Props extends GroupProps {
  data?: Array<any>;
}
export const LaptopZoneScene = ({ data = [], ...props }: Props) => {
  const { PerformanceMode } = usePerformanceModeStore();
  const seatedPlayerPosition = useSeatedPlayerPosition(data);
  const { chairPositon, chairPerformancePosition } =
    useChairPerformancePosition(data);

  return (
    <group {...props}>
      <SeatedPlayer
        position={[-7.9, 0.1, -4.5]}
        seatPosition={seatedPlayerPosition}
        consistencyBreakPoint={200}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <LaptopZoneTable
        position={[-10, 0, -4.7]}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <ChairInstance
        position={[-7.9, 0, -4.3]}
        seatPosition={
          PerformanceMode === "low"
            ? chairPerformancePosition
            : (chairPositon as SeatState[])
        }
        consistencyBreakPoint={200}
        itemsPerLine={ITEMS_PER_LINE}
      />
    </group>
  );
};
