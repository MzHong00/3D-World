import { GrMapLocation } from '@react-icons/all-files/gr/GrMapLocation'

import styles from './menuButton.module.css'

export const MenuButton = () => {

    return (
        <div className={styles.openDialogBtn}>
            <GrMapLocation />
        </div>
    );
}