import { type Coordinate } from "shared/types/type";

export const digitZoneSeatPosition = (numberOfSeat: number, width: number, height: number = width) => {
    const seatPositionList: Coordinate[] = [];
    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        const seatPosition = organizeSeat(idx, width, height);
        seatPositionList.push(seatPosition);
    });
    console.log(seatPositionList);
    
    return seatPositionList;
}

const organizeSeat = (seat: number, width: number, height: number): Coordinate => {
    let bottom, right;

    const row = seat % 5;
    const col = Math.floor(seat / 5);

    right = width * row * 1.76;
    bottom = height * (col + Math.floor(col / 2) * 2.25) * 1.7;

    return { x: right, z: bottom }
}