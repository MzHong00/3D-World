import { useMemo } from "react";

import type { Coordinate, SeatStateDto } from "shared/types/type";
import { room2SeatPosition, SEAT_COUNT } from "..";

export const useChairPerformancePosition = (data: SeatStateDto[]) => {
  // 모든 좌석의 좌표
  const chairPositon: Coordinate[] = useMemo(() => {
    const seatWidth = 1;
    const seatPosition = room2SeatPosition(SEAT_COUNT, seatWidth);

    return seatPosition;
  }, []);

  const chairPerformancePosition = useMemo(() => {
    //사용중인 좌석번호에 좌표를 결합
    return data
      .filter((seat: SeatStateDto) => seat.status === "사용 중")
      .map((seat: SeatStateDto) => ({
        ...chairPositon[seat.number - 1],
        seat,
      }));
  }, [data, chairPositon]);

  return {
    chairPositon,
    chairPerformancePosition,
  };
};
