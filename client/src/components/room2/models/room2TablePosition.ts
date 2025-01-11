import { type Coordinate } from "shared/types/type";

export const room2TablePosition = (
  numberOfSeat: number,
  itemsPerLine: number
) => {
  const TablePosition: Coordinate[] = [];

  for (let i = 0; i < numberOfSeat; i++) {
    const divN = i % (itemsPerLine * 2);

    if (divN === 0 || divN === 3 || divN === 6 || divN === 9) {
      const seatPosition = organizeTable(i, itemsPerLine);
      TablePosition.push(seatPosition);
    }
  }

  return TablePosition;
};

const organizeTable = (seat: number, itemsPerLine: number): Coordinate => {
  const widthGap = 6.8,
    heightGap = 3.5;
  let bottom,
    right,
    space = 0;

  const row = seat % itemsPerLine;
  const col = Math.floor(seat / itemsPerLine);

  if (6 <= row && row < 12) space = widthGap;

  right = widthGap * row + space * 0.7;
  bottom = heightGap * (col + Math.floor(col / 2));

  return { x: right, z: bottom };
};
