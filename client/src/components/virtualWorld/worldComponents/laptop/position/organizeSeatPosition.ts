import { type Coordinate } from "shared/types/type";

export const organizeSeatPos = (
  numberOfSeat: number,
  width: number,
  height: number = width
) => {
  const seatPositionList: Coordinate[] = [];
  
  for (let i = 0; i < numberOfSeat; i++) {
    const seatPosition = organizeSeat(i, width, height);
    seatPositionList.push(seatPosition);
  }
  
  return seatPositionList;
};

const organizeSeat = (
  seat: number,
  width: number,
  height: number
): Coordinate => {
  let bottom, right;

  // 좌석번호 201번 부터 포지션의 일관성이 깨짐 현재는 else 부분만 사용 중
  if (seat + 1 > 200) {
    const slicedNum = seat - 200;
    
    right = 15.5;
    bottom = height * (slicedNum + Math.floor(slicedNum / 6)) + 8;
  } else {
    const row = seat % 10;
    const col = Math.floor(seat / 10);
    let space = 0;

    if (3 <= row && row < 7) space = width;
    else if (7 <= row && row < 10) space = width * 2;
    right = -(width * row * 1.03 + space);
    bottom = height * (col + Math.floor(col / 2) * 0.3) * 1.3;
  }

  return { x: right, z: bottom };
};
