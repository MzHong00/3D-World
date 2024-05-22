import { type Coordinate } from "shared/types/type";

export const room2SeatPosition = (numberOfSeat: number, width: number, height: number = width) => {
    const seatPositionList: Coordinate[] = [];
    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        const seatPosition = organizeSeat(idx, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: number, width: number, height: number): Coordinate => {
    let bottom, right;

    const row = seat % 12;
    const col = Math.floor(seat / 12);

    let space = 0
    if (6 <= row && row < 12) space = width;

    right = width * row * 1.49 + space * 0.7;
    bottom = height * (col + Math.floor(col / 2) * 0.5) * 1.8;

    return { x: right, z: bottom }
}