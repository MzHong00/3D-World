import { useState, useEffect, useRef, useMemo } from "react";
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
  
  //사용 중인 좌석들의 좌표
  const [occupiedPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(() => {
    const seatWidth = 1.466;

      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

      return seatPosition;
  }, [])  

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

  return (
    <group {...props}>
      {!isPending && (
        <SeatedUserInstance
          position={[-7.9, 0.1, -4.5]}
          seatPosition={occupiedPosition}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <LaptopZoneTable
        position={[-10, 0, -4.7]}
        numberOfSeat={numberOfSeat.current}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[-7.9, 0, -4.3]}
        seatPosition={seatPosition}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
