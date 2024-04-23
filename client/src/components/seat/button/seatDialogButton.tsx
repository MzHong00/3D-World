import { GrMapLocation } from '@react-icons/all-files/gr/GrMapLocation'

import styles from './seatDialogButton.module.css'

export const SeatDialogButton = () => {

    return (
        <div className={styles.openDialogBtn}>
            <GrMapLocation />
        </div>
    );
}