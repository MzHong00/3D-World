import { Link } from "react-router-dom"
import { Dialog } from "shared/hooks/Dialog/Dialog"
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'

import styles from './detailAreaDialog.module.css'
import { useToggle } from "shared/hooks/useToggle"
import { firstLetterUppercase } from "shared/utils/firstLetterUp"
import { PreviewAvatar } from "../previewAvatar/previewAvatar"
import { Canvas } from "@react-three/fiber"

interface Props {
    area: string
    bgUrl: string
}

export const DetailAreaDialog = ({
    area, bgUrl
}: Partial<Props>) => {
    const { state: toggleState, handler: toggleHandler } = useToggle();

    return (
        <Dialog style={{ backgroundImage: `url(${bgUrl})` }}>
            <div className={styles.contentBox}>
                <section className={styles.leftContent}>
                    <h1>
                        <span>{firstLetterUppercase(area)}</span>
                    </h1>
                    <Link to={`/join-world/${area}`} className={styles.admissionButton}>입 장</Link>
                </section>

                <section className={styles.rightContent} style={{ transform: `${toggleState ? ' translateX(0)' : 'translateX(14rem)'}` }}>
                    {
                        toggleState ?
                            <div className={styles.showAvatarButton} onClick={toggleHandler}>
                                <IoIosArrowForward size={30}/>
                            </div> :
                            <div className={`${styles.showAvatarButton} ${styles.bounceAnimation}`} onClick={toggleHandler}>
                                <IoIosArrowBack size={30} />
                            </div>
                    }
                    <div className={styles.avatarContainer}>
                        <Canvas camera={{ fov: 24 }} style={{ width: '12rem', height: '22rem' }}>
                            <PreviewAvatar />
                        </Canvas>
                        <Link to="/create-character" className={styles.avatarChangeButton}>캐릭터 변경</Link>
                    </div>
                </section>
            </div>
        </Dialog>
    )
}