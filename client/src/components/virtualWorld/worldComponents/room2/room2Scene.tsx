import { useState, useEffect, useRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

import { room2SeatPosition } from "./position/room2SeatPosition";
import { Room2Table } from "./models/room2ZoneTable";
import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { usePerformanceMode } from "stores/usePerformanceMode";
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
  const { PerformanceMode } = usePerformanceMode();

  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(() => {
    const seatWidth = 1;
    const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth);

    return seatPosition;
  }, []);

  const seatPositionLowPerformance = useMemo(() => {
    if (isPending) return [];

    //사용중인 좌석번호에 좌표를 결합
    return data
      .filter((seat: SeatStateDto) => seat.status === "사용 중")
      .map((seat: SeatStateDto) => ({
        ...seatPosition[seat.number - 1],
        seat,
      }));
  }, [isPending, data, seatPosition]);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 1.4;
      const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth);

      const occupiedSeat = data
        .filter((seat: SeatStateDto) => seat.status === "사용 중")
        .map((seat: SeatStateDto) => ({
          ...seatPosition[seat.number - 1],
          seat,
        }));

      setOccupiedSeatPosition(occupiedSeat);
    };

    initPerson();
  }, [isPending, data]);

  return (
    <group {...props}>
      {!isPending && (
        <SeatedUserInstance
          position={[8.15, 0.1, -5.15]}
          seatPosition={occupiedSeatPosition}
          consistencyBreakPoint={240}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <Room2Table
        numberOfSeat={numberOfSeat.current}
        position={[30, 0, -5.4]}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[8.15, 0, -5]}
        seatPosition={
          PerformanceMode === "low" ? seatPositionLowPerformance : seatPosition as SeatState[]
        }
        consistencyBreakPoint={240}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
