import { useMemo } from "react";

import type { Coordinate, SeatStateDto } from "shared/types/type";
import { digitZoneSeatPosition, SEAT_COUNT } from "..";

export const useChairPerformancePosition = (
  data: SeatStateDto[],
  isPending: boolean
) => {
  //모든 좌석의 좌표
  const chairPositon: Coordinate[] = useMemo(() => {
    const seatWidth = 1.466;
    const seatPosition = digitZoneSeatPosition(SEAT_COUNT, seatWidth);

    return seatPosition;
  }, []);

  const chairPerformancePosition = useMemo(() => {
    if (isPending) return [];

    //사용중인 좌석번호에 좌표를 결합
    return data
      .filter((seat: SeatStateDto) => seat.status === "사용 중")
      .map((seat: SeatStateDto) => ({
        ...chairPositon[seat.number - 1],
        seat,
      }));
  }, [isPending, data, chairPositon]);

  return {
    chairPositon,
    chairPerformancePosition,
  };
};
