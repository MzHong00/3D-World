import { type Coordinate } from "shared/types/type";

export const organizeSeatPos = (numberOfSeat: number, width: number, height: number = width) => {
    const seatPositionList: Coordinate[] = [];
    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        const seatPosition = organizeSeat(idx, width, height);
        seatPositionList.push(seatPosition);
    });

    return seatPositionList;
}

const organizeSeat = (seat: number, width: number, height: number): Coordinate => {
    let bottom, right;

    if (seat + 1 > 200) {
        const slicedNum = seat + 1 - 200;
        const top = height * 19 + Math.floor(19 / 2) * height;

        right = -120
        bottom = top - (height * (slicedNum - 1) + Math.floor((slicedNum - 1) / 2) * height)
    } else {
        const row = seat % 10;
        const col = Math.floor(seat / 10);
        let space = 0

        if (3 <= row && row < 7) space = width * 2
        else if (7 <= row && row < 10) space = width * 4
        right = width * row + space;
        bottom = height * col + Math.floor(col / 2) * height + height * 1.5;
    }

    return { z: bottom, x: right }
}