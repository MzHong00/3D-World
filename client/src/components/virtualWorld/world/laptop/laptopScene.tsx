import { useState, useEffect, useRef, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";

import { organizeSeatPos } from "./position/organizeSeatPosition";
import { LaptopZoneTable } from "./models/laptopZoneTable";

import { ChairInstance } from "components/models/Chair/chairInstance";
import { SeatedUserInstance } from "components/character/seatedUserInstance";
import {
  type SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";
import { usePerformanceMode } from "stores/usePerformanceMode";

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
  const numberOfSeat = useRef<number>(218);
  const itemsPerLine = useRef<number>(10);
  const { PerformanceMode } = usePerformanceMode();
  //사용 중인 좌석들의 좌표
  const [occupiedPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

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

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 2.057;
      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

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
          position={[-7.9, 0.1, -4.5]}
          seatPosition={occupiedPosition}
          consistencyBreakPoint={200}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <LaptopZoneTable
        position={[-10, 0, -4.7]}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[-7.9, 0, -4.3]}
        seatPosition={
          PerformanceMode === "low" ? seatPositionLowPerformance : seatPosition as SeatState[]
        }
        consistencyBreakPoint={200}
        itemsPerLine={itemsPerLine.current}
      />
    </group>
  );
};
