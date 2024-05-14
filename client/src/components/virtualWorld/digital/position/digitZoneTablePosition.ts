import { type Coordinate } from "shared/types/type";

export const digitalZoneTablePosition = (numberOfSeat: number,  itemsPerLine: number) => {
    const bigTablePosition: Coordinate[] = [];
    const smallTablePosition: Coordinate[] = [];

    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        if (idx % (itemsPerLine * 2) === 0 || idx % (itemsPerLine * 2) === 2) {
            const seatPosition = organizeTable(idx, itemsPerLine);

            idx % (itemsPerLine * 2) === 2 ? bigTablePosition.push(seatPosition) : smallTablePosition.push(seatPosition);
        }
    });
    
    let seatPositionList: any = {}
    seatPositionList.bigTable = bigTablePosition;
    seatPositionList.smallTable = smallTablePosition;

    return seatPositionList;
}

const organizeTable = (seat: number, itemsPerLine: number): Coordinate => {
    const widthGap = 13, heightGap = 8.25;
    let bottom, right;

    const row = seat % itemsPerLine;
    const col = Math.floor(seat / itemsPerLine);

    right = widthGap * row
    bottom = heightGap * (col + Math.floor(col / 2) + 1.5)

    return { x: right, z: bottom }
}