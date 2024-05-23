import { type Coordinate } from "shared/types/type";

export const digitalZoneTablePosition = (
  numberOfSeat: number,
  itemsPerLine: number
) => {
  const bigTablePosition: Coordinate[] = [];
  const smallTablePosition: Coordinate[] = [];

  for (let i = 0; i < numberOfSeat; i++) {
    if (i % (itemsPerLine * 2) === 0 || i % (itemsPerLine * 2) === 2) {
      const seatPosition = organizeTable(i, itemsPerLine);

      i % (itemsPerLine * 2) === 2
        ? bigTablePosition.push(seatPosition)
        : smallTablePosition.push(seatPosition);
    }
  }

  let seatPositionList: any = {};
  seatPositionList.bigTable = bigTablePosition;
  seatPositionList.smallTable = smallTablePosition;

  return seatPositionList;
};

const organizeTable = (seat: number, itemsPerLine: number): Coordinate => {
  const widthGap = 10,
    heightGap = 5;
  let bottom, right;

  const row = seat % itemsPerLine;
  const col = Math.floor(seat / itemsPerLine);

  right = widthGap * row;
  bottom = heightGap * (col + Math.floor(col / 2));

  return { x: right, z: bottom };
};
