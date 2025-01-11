import { useEffect, useState } from "react";

import type { SeatState, SeatStateDto } from "shared/types/type";
import { organizeSeatPos } from "./organizeSeatPosition";
import { SEAT_COUNT } from "..";

export const useSeatedPlayerPosition = (
  data: SeatStateDto[],
  isPending: boolean
) => {
  const [seatedUserPosition, setSeatedUserPosition] = useState<SeatState[]>([]);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 2.057;
      const seatPosition = organizeSeatPos(SEAT_COUNT, seatWidth);

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
