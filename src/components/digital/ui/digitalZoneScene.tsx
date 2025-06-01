import { GroupProps } from "@react-three/fiber";

import type { SeatState } from "shared/types/type";
import { Plant } from "shared/ui/Plant/plant";
import { ChairInstance } from "shared/ui/Chair/chairInstance";
import { HemiRoundTable } from "shared/ui/Table/hemiRoundTable";
import { MonitorInstance } from "shared/ui/Monitor/monitorInstance";
import { CylinderTableInstance } from "shared/ui/Table/cylinderTableInstance";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";
import { SeatedPlayer } from "components/player/ui/seatedPlayer";

import { ITEMS_PER_LINE, SEAT_COUNT } from "..";
import { MultiFlexZone } from "./multiFlexZone";
import { DigitalZoneTable } from "./digitalZoneTable";
import { useSeatedPlayerPosition } from "../models/useSeatedPlayerPosition";
import { useChairPerformancePosition } from "../models/useChairPerformancePosition";

interface Props extends GroupProps {
  isPending?: boolean;
  data?: Array<any>;
}

export const DigitalZoneScene = ({
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
          position={[20.5, 0.1, -6.8]}
          seatPosition={seatedPlayerPosition}
          consistencyBreakPoint={50}
          itemsPerLine={ITEMS_PER_LINE}
        />
      )}
      <DigitalZoneTable
        position={[30, 0, -7]}
        numberOfSeat={SEAT_COUNT}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <ChairInstance
        position={[20.5, 0, -6.8]}
        seatPosition={
          PerformanceMode === "low"
            ? chairPerformancePosition
            : (chairPositon as SeatState[])
        }
        consistencyBreakPoint={50}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <MonitorInstance
        position={[20.5, 0, -6.8]}
        seatPosition={chairPositon}
        itemsPerLine={ITEMS_PER_LINE}
      />
      <CylinderTableInstance numberOfTable={4} position={[13, 0, -50]} />
      <HemiRoundTable position={[12, 1, -1]} frustumCulled />
      <MultiFlexZone
        rotation={[0, Math.PI * 0.25, 0]}
        position={[26, 0, -53]}
      />
      <MultiFlexZone
        rotation={[0, Math.PI * 0.25, 0]}
        position={[15, 0, -59]}
      />
      <Plant position={[5, 0, -10]} scale={0.35} />
    </group>
  );
};
