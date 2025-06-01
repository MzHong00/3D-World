import { useEffect, useState } from "react";

import type { SeatState, SeatStateDto } from "shared/types/type";
import { digitZoneSeatPosition, SEAT_COUNT } from "..";

export const useSeatedPlayerPosition = (
  data: SeatStateDto[],
  isPending: boolean
) => {
  const [seatedUserPosition, setSeatedUserPosition] = useState<SeatState[]>([]);

  //사용 중인 좌석들의 좌표
  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const personWidth = 2.057;

      const seatPosition = digitZoneSeatPosition(SEAT_COUNT, personWidth);

      const occupiedSeat = data
        .filter((seat: SeatStateDto) => seat.status === "사용 중")
        .map((seat: SeatStateDto) => ({
          ...seatPosition[seat.number - 1],
          seat,
        }));

      setSeatedUserPosition(occupiedSeat);
    };

    initPerson();
  }, [isPending, data]);

  return seatedUserPosition;
};
