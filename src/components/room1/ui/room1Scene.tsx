import { GroupProps } from "@react-three/fiber";

import type { SeatState, SeatStateDto } from "shared/types/type";
import { ChairInstance } from "shared/ui/Chair/chairInstance";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";
import { SeatedPlayer } from "components/player/ui/seatedPlayer";

import { Room1Table } from "./room1Table";
import { ITEMS_PER_LINE } from "../consts/consts";
import { useSeatedPlayerPosition } from "../model/useSeatedPlayerPosition";
import { useChairPerformancePosition } from "../model/useChairPerformancePosition";

interface Props extends GroupProps {
  data: SeatStateDto[];
}

export const Room1Scene = ({ data = [], ...props }: Props) => {
  const { PerformanceMode } = usePerformanceModeStore();
  const seatedPlayerPosition = useSeatedPlayerPosition(data);
  const { chairPositon, chairPerformancePosition } =
    useChairPerformancePosition(data);

  return (
    <group {...props}>
      <SeatedPlayer
        position={[-7.9, 0.1, -4.5]}
        seatPosition={seatedPlayerPosition}
        consistencyBreakPoint={180}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <Room1Table position={[-10, 0, -4.7]} itemsPerLine={ITEMS_PER_LINE} />
      <ChairInstance
        position={[-7.9, 0, -4.3]}
        seatPosition={
          PerformanceMode === "low"
            ? chairPerformancePosition
            : (chairPositon as SeatState[])
        }
        consistencyBreakPoint={180}
        itemsPerLine={ITEMS_PER_LINE}
      />
    </group>
  );
};
