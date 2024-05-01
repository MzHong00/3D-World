import { useEffect } from 'react'

import { GrMapLocation } from '@react-icons/all-files/gr/GrMapLocation'
import { BsList } from '@react-icons/all-files/bs/BsList'
import { BsCameraVideo } from '@react-icons/all-files/bs/BsCameraVideo'
import { BsCameraVideoFill } from '@react-icons/all-files/bs/BsCameraVideoFill'

import styles from './menuList.module.css'
import { useToggle } from 'shared/hooks/useToggle'
import { RoundButton } from 'shared/ui/Button/roundButton'
import { useCameraModeStore } from 'stores/useCameraModeStore'
import { useDialogStore } from 'stores/useOpenDialogStore'

export const MenuList = () => {
    const { state: isMenuOpen, handler: toggleMenuOpen } = useToggle();
    const { state: cameraMode, handler: toggleCameraMode } = useToggle({ initState: true });
    const {setDialogOpen} = useDialogStore();
    const { setModeState } = useCameraModeStore(state => state);

    useEffect(() => {
        setModeState(cameraMode);
    }, [cameraMode, setModeState]);

    return (
        <nav className={styles.menuList}>
            <RoundButton className={`${styles.menuButton} ${styles.menuListButton}`} onClick={toggleMenuOpen}>
                <BsList size={20} />
            </RoundButton>
            <RoundButton className={styles.menuButton} style={{ transform: `${isMenuOpen ? 'translateX(-4rem)' : 'translateX(0)'}` }} onClick={setDialogOpen}>
                <GrMapLocation />
            </RoundButton>
            <RoundButton className={styles.menuButton} style={{ transform: `${isMenuOpen ? 'translateX(-8rem)' : 'translateX(0)'}` }} onClick={toggleCameraMode}>
                {cameraMode ? <BsCameraVideo /> : <BsCameraVideoFill />}
            </RoundButton>
        </nav>
    );
}