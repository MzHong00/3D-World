import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { GroupProps } from "@react-three/fiber";

import { organizeSeatPos } from "./position/organizeSeatPosition";
import { LaptopZoneTable } from "./models/laptopZoneTable";

import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import {
  SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";

import { WallGroup } from "components/models/wall/wallGroup";

interface Props extends GroupProps {
  isPending?: boolean;
  data?: Array<any>;
}
export const LaptopZoneScene = ({
  isPending = true,
  data = [],
  ...props
}: Props) => {
  //총 좌석의 개수, 한 줄당 좌석의 개수
  const numberOfSeat = useRef<number>(200);
  const itemsPerLine = useRef<number>(10);

  //모든 좌석의 좌표
  const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
  //사용 중인 좌석들의 좌표
  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 2.057;
      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

      const occupiedSeat = data
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
