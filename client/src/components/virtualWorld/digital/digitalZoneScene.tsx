import { useState, useEffect, useLayoutEffect, useRef } from "react";

import { digitZoneSeatPosition } from "./position/digitZoneSeatPosition";
import { DigitalZoneTable } from "./models/digitalZoneTable";

import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { ChairInstance } from "components/models/chair/chairInstance";
import {
  type SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";
import { MonitorInstance } from "components/models/items/monitor";
import { GroupProps } from "@react-three/fiber";
import { WallGroup } from "components/models/wall/wallGroup";

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

  const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

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

  useLayoutEffect(() => {
    const initSeat = () => {
      const seatWidth = 1.466;
      const seatPosition = digitZoneSeatPosition(
        numberOfSeat.current,
        seatWidth
      );

      setSeatPosition(seatPosition);
    };

    initSeat();
  }, []);

  return (
    <group {...props}>
      <WallGroup position={[19.6, 0, -32.5]} rotation={[0, Math.PI, 0]} />
      {!isPending && (
        <SeatedUserInstance
          position={[20.5, 0.1, -6.8]}
          seatPosition={occupiedSeatPosition}
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
        itemsPerLine={itemsPerLine.current}
      />
      <MonitorInstance
        position={[20.5, 0, -6.8]}
        seatPosition={seatPosition}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
