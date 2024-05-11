import { type Coordinate } from "shared/types/type";

export const organizeTablePos = (numberOfSeat: number, width: number, height: number = width) => {

    const bigTablePosition: Coordinate[] = [];
    const smallTablePosition: Coordinate[] = [];

    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        if (idx % 20 === 0 || idx % 20 === 3 || idx % 20 === 7) {
            const seatPosition = organizeTable(idx, width, height);

            idx % 20 === 3 ? bigTablePosition.push(seatPosition) : smallTablePosition.push(seatPosition);
        }
    });

    let seatPositionList: any = {}
    seatPositionList.bigTable = bigTablePosition;
    seatPositionList.smallTable = smallTablePosition;

    return seatPositionList;
}

const organizeTable = (seat: number, width: number, height: number): Coordinate => {
    let bottom, right;

    if (seat + 1 > 200) {
        const slicedNum = seat - 201;
        const top = height * (19 + Math.floor(19 / 2))

        right = -120
        bottom = top - (height * ((slicedNum - 1) + Math.floor((slicedNum - 1) / 2)))
    } else {
        const row = seat % 10;
        const col = Math.floor(seat / 10);
        let space = 0

        if (3 <= row && row < 7) space = width * 2
        else if (7 <= row && row < 10) space = width * 4
        right = width * row + space * 1.07;
        bottom = height * (col + Math.floor(col / 2) + 1.5)
    }

    return { z: bottom, x: right }
}