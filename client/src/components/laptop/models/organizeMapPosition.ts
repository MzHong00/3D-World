import { type SeatState, type SeatStateDto } from "shared/types/type";

export const organizeMapPosition = (
  seatList: SeatStateDto[] = [],
  width: number,
  height: number = width
) => {
  const seatPositionList: SeatState[] = [];

  seatList.forEach((seat) => {
    if (seat.status === undefined) return;
    const seatPosition = organizeSeat(seat, width, height);
    seatPositionList.push(seatPosition);
  });

  return seatPositionList;
};

const organizeSeat = (
  seat: SeatStateDto,
  width: number,
  height: number
): SeatState => {
  let bottom, right;

  // 좌석번호 201번 부터 포지션의 일관성이 깨짐 현재는 else 부분만 사용 중
  if (seat.number > 200) {
    const slicedNum = seat.number - 200;

    right = -164;
    bottom = height * (slicedNum + Math.floor((slicedNum - 1) / 6)*0.3) * 0.85 + 105;
  } else {
    const row = (seat.number - 1) % 10;
    const col = Math.floor((seat.number - 1) / 10);
    let space = 0;

    if (3 <= row && row < 7) space = width;
    else if (7 <= row && row < 10) space = width * 2;
    right = width * row + space * 0.95 + 95;
    bottom = height * (col + Math.floor(col / 2) * 0.5) + 20;
  }

  return { x: right, z: bottom, seat: seat };
};
