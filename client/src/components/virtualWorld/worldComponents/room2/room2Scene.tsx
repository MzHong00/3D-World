import { useState, useEffect, useRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

import { room2SeatPosition } from "./position/room2SeatPosition";
import { Room2Table } from "./models/room2ZoneTable";

import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import {
  type SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";

interface Props extends GroupProps {
  isPending?: boolean;
  data?: Array<any>;
}

export const Room2Scene = ({
  isPending = true,
  data = [],
  ...props
}: Props) => {
  const numberOfSeat = useRef<number>(240);
  const itemsPerLine = useRef<number>(12);

  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(() => {
    const seatWidth = 1;
    const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth);

    return seatPosition;
  }, []);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 1.4;
      const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth);

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
          seatPosition={occupiedSeatPosition}
          position={[8.15, 0.1, -5.15]}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <Room2Table
        numberOfSeat={numberOfSeat.current}
        position={[30, 0, -5.4]}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        seatPosition={seatPosition}
        position={[8.15, 0, -5]}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};