import { useMemo } from "react";

import type { Coordinate, SeatStateDto } from "shared/types/type";
import { organizeSeatPos } from "components/laptop/models/organizeSeatPosition";
import { SEAT_COUNT } from "../consts/consts";

export const useChairPerformancePosition = (data: SeatStateDto[],
    isPending: boolean) => {
    
      // 모든 좌석의 좌표
      const chairPositon: Coordinate[] = useMemo(
        () => organizeSeatPos(SEAT_COUNT, 1.466),
        []
      );
    
      // 저사양 모드 좌석 좌표
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
        chairPerformancePosition
      }
}