import { SeatStateDto, type Coordinate } from "shared/types/type";

export interface OrganizedSeatPosition extends Coordinate {
    seat: SeatStateDto
}

export const digitZoneMapState = (seatList: SeatStateDto[] = [], width: number, height: number = width) => {
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

    const row = 2 - (seat.number - 1) % 5;
    const col = Math.floor((seat.number - 1) / 5);

    right = width * row;
    bottom = height * (col + Math.floor(col / 2)) * 1.37 + 20

    return { z: bottom, x: right, seat: seat }
}