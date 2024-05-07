import { useRef } from "react"
import { organizeSeatPos } from "../position/useSeatPosition"
import { LaptopZoneCursor } from "./laptopMapCursor"
import { type SeatStateDto } from "shared/types/type"
import { Dialog } from "shared/hooks/Dialog/useDialog"

import styles from './laptopMap.module.css'

interface Props {
    seatList: Array<SeatStateDto>
}

export const LaptopZoneMap = ({
    seatList = []
}: Props) => {
    const width = useRef<number>(28);
    const seatPosition = organizeSeatPos(seatList, width.current);
    
    return (
        <Dialog className={styles.dialog}>
            <LaptopZoneCursor />
            <div className={styles.laptopZone}>
                {
                    seatPosition?.map((seat, idx) => (
                        <div 
                            key={idx}
                            className={styles.seat} 
                            style={{ bottom: seat.z, right: seat.x, backgroundColor: `${seat.seat.status === '배정가능' ? '#85d604' : '#f18fee'}` }}>
                            <span className={styles.seatFont}>{idx + 1}</span>
                        </div>
                    ))
                }
            </div>
        </Dialog>
    )
}
