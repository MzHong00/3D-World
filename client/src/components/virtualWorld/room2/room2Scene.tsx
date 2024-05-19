import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { GroupProps } from "@react-three/fiber";

import { room2SeatPosition } from "./position/room2SeatPosition";
import { Room2Table } from "./models/room2ZoneTable";

import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { WallGroup } from "components/models/wall/wallGroup";
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

  const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );
  
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

  useLayoutEffect(() => {
    const initSeat = () => {
      const seatWidth = 1;
      const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth);

      setSeatPosition(seatPosition);
    };

    initSeat();
  }, []);

  return (
    <group {...props}>
      <WallGroup position={[19.6, 0, -32.5]} rotation={[0, Math.PI, 0]} />
      {!isPending && (
        <SeatedUserInstance
          seatPosition={occupiedSeatPosition}
          position={[8.8, 0.1, -5.15]}
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
