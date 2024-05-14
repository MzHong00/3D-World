import { type Coordinate } from "shared/types/type";

export const organizeTablePos = (numberOfSeat: number, itemsPerLine: number) => {
    // 모든 테이블 크기가 같지 않기 때문에, 작은 테이블과 큰 테이블의 위치를 각각 따로 보관
    const bigTablePosition: Coordinate[] = [];
    const smallTablePosition: Coordinate[] = [];

    // 의자(좌석)의 개수로 연산을 통해 0, 3, 7번 째 자리의 위치를 알게 됨
    Array.from({ length: numberOfSeat }).forEach((_, idx) => {
        if (idx % (itemsPerLine * 2) === 0 || idx % (itemsPerLine * 2) === 3 || idx % (itemsPerLine * 2) === 7) {
            const seatPosition = organizeTable(idx, itemsPerLine);

            // 큰 테이블과 작은 테이블을 분류
            idx % 20 === 3 ? bigTablePosition.push(seatPosition) : smallTablePosition.push(seatPosition);
        }
    });

    let seatPositionList: any = {}
    seatPositionList.bigTable = bigTablePosition;
    seatPositionList.smallTable = smallTablePosition;

    return seatPositionList;
}

const organizeTable = (seat: number, itemsPerLine: number): Coordinate => {
    const widthGap = 7, heightGap = 5;
    let bottom, right;

    // 좌석번호 201번 부터 포지션의 일관성이 깨짐 현재는 else 부분만 사용 중
    if (seat + 1 > 200) {
        const slicedNum = seat - 201;
        const top = heightGap * (19 + Math.floor(19 / 2))

        right = -120
        bottom = top - (heightGap * ((slicedNum - 1) + Math.floor((slicedNum - 1) / 2)))
    } else {
        const row = seat % itemsPerLine;
        const col = Math.floor(seat / itemsPerLine);

        // 좌석과 좌석 사이의 공간이 존재함
        // 상수로 +, -, * 연산은 모두 좌표에 맞게 보정을 하기 위함
        let space = 0
        if (3 <= row && row < 7) space = widthGap * 2
        else if (7 <= row && row < 10) space = widthGap * 4

        right = widthGap * row + space * 1.07;
        bottom = heightGap * (col + Math.floor(col / 2) + 1.5)
    }

    return { x: right, z: bottom }
}