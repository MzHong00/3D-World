import { type Coordinate } from "shared/types/type";

export const digitZoneSeatPosition = (numberOfSeat: number, width: number, height: number = width) => {
    const seatPositionList: Coordinate[] = [];
    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        const seatPosition = organizeSeat(idx, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: number, width: number, height: number): Coordinate => {
    let bottom, right;

    const row = seat % 5;
    const col = Math.floor(seat / 5);

    right = width * row * 1.3;
    bottom = height * (col + Math.floor(col / 2) * 1.35) * 1.31 - 0.2;

    return { x: right, z: bottom }
}