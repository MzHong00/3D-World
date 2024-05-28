import { useState, useEffect, useRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

import { organizeSeatPos } from "../laptop/position/organizeSeatPosition";
import { Room1Table } from "./models/room1Table";

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

export const Room1Scene = ({
  isPending = true,
  data = [],
  ...props
}: Props) => {
  const numberOfSeat = useRef<number>(180);
  const itemsPerLine = useRef<number>(10);

  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(() => {
    const seatWidth = 1.466;
    const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

    return seatPosition;
  }, []);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 2.057;
      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

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
          position={[-7.9, 0.1, -4.5]}
          seatPosition={occupiedSeatPosition}
          consistencyBreakPoint={180}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <Room1Table
        position={[-10, 0, -4.7]}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[-7.9, 0, -4.3]}
        seatPosition={seatPosition}
        consistencyBreakPoint={180}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
