import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { GroupProps } from "@react-three/fiber";

import { organizeSeatPos } from "../laptop/position/organizeSeatPosition";
import { LaptopZoneTable } from "../laptop/models/laptopZoneTable";

import { WallGroup } from "components/models/wall/wallGroup";
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

  const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

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

  useLayoutEffect(() => {
    const initSeat = () => {
      const seatWidth = 1.466;
      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

      setSeatPosition(seatPosition);
    };

    initSeat();
  }, []);

  return (
    <group {...props}>
      <WallGroup position={[-18.5, 0, -32.5]} />
      {!isPending && (
        <SeatedUserInstance
          position={[-30.8, 0.1, -4.5]}
          seatPosition={occupiedSeatPosition}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <LaptopZoneTable
        position={[-10, 0, -4.7]}
        numberOfSeat={numberOfSeat.current}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[-30.8, 0, -4.3]}
        seatPosition={seatPosition}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
