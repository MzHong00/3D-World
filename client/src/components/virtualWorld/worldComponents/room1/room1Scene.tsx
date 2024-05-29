import { useRef, useMemo, useState, useEffect } from "react";
import { GroupProps } from "@react-three/fiber";

import { organizeSeatPos } from "../laptop/position/organizeSeatPosition";
import { Room1Table } from "./models/room1Table";

import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { usePerformanceMode } from "stores/usePerformanceMode";
import {
  SeatState,
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
  const [occupiedPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

  const { PerformanceMode } = usePerformanceMode();

  //모든 좌석의 좌표
  const seatPosition: Coordinate[] = useMemo(
    () => organizeSeatPos(numberOfSeat.current, 1.466),
    []
  );

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

  //사용 중인 좌석들의 좌표
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
        seatPosition={
          PerformanceMode === "low" ? seatPositionLowPerformance : seatPosition as SeatState[]
        }
        consistencyBreakPoint={180}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
