import { UserPointer, type UserStartPosition } from "./userPointer"
import { Dialog } from "shared/hooks/Dialog/useDialog"

import styles from './map.module.css'
import { DialogHTMLAttributes } from "react"
import { SeatState } from "shared/types/type"

interface Props extends DialogHTMLAttributes<HTMLDialogElement>, UserStartPosition {
    seatPosition: SeatState[]
}

export const Map = ({
    seatPosition = [], userStartPosition = 'right', children, ...props
}: Partial<Props>) => {

    return (
        <Dialog className={styles.dialog} {...props}>
            <UserPointer userStartPosition={userStartPosition} />
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
            {children}
        </Dialog>
    )
}
