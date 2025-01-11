import { SeatStateDto, type Coordinate } from "shared/types/type";

export interface OrganizedSeatPosition extends Coordinate {
    seat: SeatStateDto
}

export const digitZoneMapPosition = (seatList: SeatStateDto[] = [], width: number, height: number = width) => {
    const seatPositionList: OrganizedSeatPosition[] = [];
    seatList.forEach((seat) => {
        if (!seat.status) return;
        
        const seatPosition = organizeSeat(seat, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: SeatStateDto, width: number, height: number): OrganizedSeatPosition => {
    let bottom, right;

    const row = 2 - (seat.number - 1) % 5;
    const col = Math.floor((seat.number - 1) / 5);

    right = width * row * 1.28 - 399;
    bottom = height * (col + Math.floor(col / 2) * 1.65)  + 43

    return { z: bottom, x: right, seat: seat }
}