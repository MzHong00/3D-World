import { Dialog } from "shared/hooks/Dialog/useDialog"

import styles from './laptopZoneMap.module.css'
import { useRef } from "react"
import { type Coordinate, type SeatStateDto } from "shared/types/type"

interface Props {
    characterPos: Coordinate
    seatList: Array<SeatStateDto>
}

export const LaptopZoneMap = ({
    characterPos, seatList = []
}: Props) => {
    const speed = useRef<number>(10);
    const width = useRef<number>(28);

    return (
        <Dialog className={styles.dialog}>
            <h2 style={{ transform: `translate(${characterPos.x * speed.current}px, ${characterPos.z * speed.current}px)` }} className={styles.character}>@</h2>
            <div className={styles.laptopZone}>
                {seatList.map((seat: SeatStateDto, index) => {
                    const seatPosition = organizeSeat(seat.number, width.current, width.current)
                    if (seat.status === undefined) return null

                    return (
                        <div 
                            key={index}
                            className={styles.seat} 
                            style={{ bottom: seatPosition.bottom, right: seatPosition.right }}>
                            <span className={styles.seatFont}>{seat.number}</span>
                        </div>
                    )
                })}
            </div>
        </Dialog>
    )
}

export const organizeSeat = (seatNum: number, width: number, height: number) => {
    let bottom, right;

    if (seatNum > 200) {
        const slicedNum = seatNum - 200;
        const top = height * 19 + Math.floor(19 / 2) * height;

        right = -60
        bottom = top - (height * (slicedNum - 1) + Math.floor((slicedNum - 1) / 2) * height)
    } else {
        const row = (seatNum - 1) % 10;
        const col = Math.floor((seatNum - 1) / 10);
        let space = 0

        if (3 <= row && row < 7) space = width
        else if (7 <= row && row < 10) space = width * 2
        right = width * row + space;
        bottom = height * col + Math.floor(col / 2) * height + height * 1.5;
    }

    return { bottom: bottom, right: right }
}