import { GroupProps } from "@react-three/fiber";

import type { SeatState } from "shared/types/type";
import { ChairInstance } from "shared/ui/Chair/chairInstance";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";
import { SeatedPlayer } from "components/player/ui/seatedPlayer";
import { Room2Table } from "./room2ZoneTable";

import {
  ITEMS_PER_LINE,
  SEAT_COUNT,
  useChairPerformancePosition,
  useSeatedPlayerPosition,
} from "..";

interface Props extends GroupProps {
  isPending?: boolean;
  data?: Array<any>;
}

export const Room2Scene = ({
  isPending = true,
  data = [],
  ...props
}: Props) => {
  const { PerformanceMode } = usePerformanceModeStore();
  const seatedPlayerPosition = useSeatedPlayerPosition(data, isPending);
  const { chairPositon, chairPerformancePosition } =
    useChairPerformancePosition(data, isPending);

  return (
    <group {...props}>
      {!isPending && (
        <SeatedPlayer
          position={[8.15, 0.1, -5.15]}
          seatPosition={seatedPlayerPosition}
          consistencyBreakPoint={240}
          itemsPerLine={ITEMS_PER_LINE}
        />
      )}
      <Room2Table
        numberOfSeat={SEAT_COUNT}
        position={[30, 0, -5.4]}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <ChairInstance
        position={[8.15, 0, -5]}
        seatPosition={
          PerformanceMode === "low"
            ? chairPerformancePosition
            : (chairPositon as SeatState[])
        }
        consistencyBreakPoint={240}
        itemsPerLine={ITEMS_PER_LINE}
      />
    </group>
  );
};
