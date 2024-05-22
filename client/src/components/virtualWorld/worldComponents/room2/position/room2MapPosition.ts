import { SeatStateDto, type Coordinate } from "shared/types/type";

export interface OrganizedSeatPosition extends Coordinate {
    seat: SeatStateDto
}

export const room2MapPosition = (seatList: SeatStateDto[] = [], width: number, height: number = width) => {
    const seatPositionList: OrganizedSeatPosition[] = [];
    seatList.forEach((seat) => {
        if (seat.status === undefined) return;
        const seatPosition = organizeSeat(seat, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: SeatStateDto, width: number, height: number): OrganizedSeatPosition => {
    let bottom, right;

    const row = (seat.number - 1) % 12;
    const col = Math.floor((seat.number - 1) / 12);
    let space = 0

    if (0 <= row && row < 6) space = width * 0.5

    right = -width * row + space - 200
    bottom = height * (col + Math.floor(col / 2) * 0.55) + 27

    return { z: bottom, x: right, seat: seat }
}