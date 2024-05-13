import { type SeatState, type SeatStateDto } from "shared/types/type";

export const organizeMapPosition = (seatList: SeatStateDto[] = [], width: number, height: number = width) => {
    const seatPositionList: SeatState[] = [];

    seatList.forEach((seat) => {
        if (seat.status === undefined) return;
        const seatPosition = organizeSeat(seat, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: SeatStateDto, width: number, height: number): SeatState => {
    let bottom, right;

    if (seat.number > 200) {
        const slicedNum = seat.number - 200;
        const top = height * 19 + Math.floor(19 / 2) * height;

        right = -120
        bottom = top - (height * (slicedNum - 1) + Math.floor((slicedNum - 1) / 2) * height)
    } else {
        const row = (seat.number - 1) % 10;
        const col = Math.floor((seat.number - 1) / 10);
        let space = 0

        if (3 <= row && row < 7) space = width * 2
        else if (7 <= row && row < 10) space = width * 4
        right = width * row + space;
        bottom = height * (col + Math.floor(col / 2) + 1.5);
    }

    return { x: right, z: bottom, seat: seat }
}