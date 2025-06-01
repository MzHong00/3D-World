import { useEffect, useState } from "react";

import type { SeatState, SeatStateDto } from "shared/types/type";
import { room2SeatPosition, SEAT_COUNT } from "..";

export const useSeatedPlayerPosition = (data: SeatStateDto[]) => {
  const [seatedUserPosition, setSeatedUserPosition] = useState<SeatState[]>([]);

  //사용 중인 좌석들의 좌표
  useEffect(() => {
    const initPerson = () => {
      const seatWidth = 1.4;
      const seatPosition = room2SeatPosition(SEAT_COUNT, seatWidth);

      const occupiedSeat = data
        .filter((seat: SeatStateDto) => seat.status === "사용 중")
        .map((seat: SeatStateDto) => ({
          ...seatPosition[seat.number - 1],
          seat,
        }));

      setSeatedUserPosition(occupiedSeat);
    };

    initPerson();
  }, [data]);

  return seatedUserPosition;
};
