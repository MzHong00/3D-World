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
    const length = useRef<number>(28);

    return (
        <Dialog className={styles.dialog}>
            <h2 style={{ transform: `translate(${characterPos.x * speed.current}px, ${characterPos.z * speed.current}px)` }} className={styles.character}>@</h2>
            <div className={styles.laptopZone}>
                {seatList.map((seat: SeatStateDto, index) => {
                    const seatPosition = disposeSeat(seat.number, length.current)
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

const disposeSeat = (seatNum: number, length: number) => {
    let bottom, right;

    if (seatNum > 200) {
        const slicedNum = seatNum - 200;
        const top = length * 19 + Math.floor(19 / 2) * length;

        right = -60
        bottom = top - (length * (slicedNum - 1) + Math.floor((slicedNum - 1) / 2) * length)
    } else {
        const row = (seatNum - 1) % 10;
        const col = Math.floor((seatNum - 1) / 10);
        let space = 0

        if (3 <= row && row < 7) space = length
        else if (7 <= row && row < 10) space = length * 2
        right = length * row + space;
        bottom = length * col + Math.floor(col / 2) * length + length * 1.5;
    }

    return { bottom: bottom, right: right }
}