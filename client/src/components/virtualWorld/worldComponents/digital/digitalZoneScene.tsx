import { useState, useEffect, useRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

import { digitZoneSeatPosition } from "./position/digitZoneSeatPosition";
import { DigitalZoneTable } from "./models/digitalZoneTable";
import { MultiFlexZone } from "./models/multiFlexZone";

import { Plant } from "components/models/items/plant";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { ChairInstance } from "components/models/chair/chairInstance";
import { MonitorInstance } from "components/models/items/monitorInstance";
import { CylinderTableInstance } from "components/models/table/cylinderTableInstance";
import { HemiRoundTable } from "components/models/table/hemiRoundTable";
import {
  type SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";

interface Props extends GroupProps {
  isPending?: boolean;
  data?: Array<any>;
}

export const DigitalZoneScene = ({
  isPending = true,
  data = [],
  ...props
}: Props) => {
  const numberOfSeat = useRef<number>(50);
  const itemsPerLine = useRef<number>(5);

  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(() => {
    const seatWidth = 1.466;
    const seatPosition = digitZoneSeatPosition(numberOfSeat.current, seatWidth);

    return seatPosition;
  }, []);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const personWidth = 2.057;

      const seatPosition = digitZoneSeatPosition(
        numberOfSeat.current,
        personWidth
      );

      const occupiedSeat = data
        .slice(0, numberOfSeat.current)
        .filter((seat: SeatStateDto) => seat.status === "사용 중")
        .map((seat: SeatStateDto) => {
          const seatState: SeatState = {
            ...seatPosition[seat.number - 1],
            seat,
          };

          return seatState;
        });

      setOccupiedSeatPosition(occupiedSeat);
    };

    initPerson();
  }, [isPending, data]);

  return (
    <group {...props}>
      {!isPending && (
        <SeatedUserInstance
          position={[20.5, 0.1, -6.8]}
          seatPosition={occupiedSeatPosition}
          consistencyBreakPoint={50}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <DigitalZoneTable
        position={[30, 0, -7]}
        numberOfSeat={numberOfSeat.current}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[20.5, 0, -6.8]}
        seatPosition={seatPosition}
        consistencyBreakPoint={50}
        itemsPerLine={itemsPerLine.current}
      />
      <MonitorInstance
        position={[20.5, 0, -6.8]}
        seatPosition={seatPosition}
        itemsPerLine={itemsPerLine.current}
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
