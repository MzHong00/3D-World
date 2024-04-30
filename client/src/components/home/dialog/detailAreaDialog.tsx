import { Link } from "react-router-dom"
import { Dialog } from "shared/hooks/Dialog/Dialog"

import { firstLetterUppercase } from "shared/utils/firstLetterUp"
import styles from './detailAreaDialog.module.css'

interface Props {
    area: string
    bgUrl: string
}

export const DetailAreaDialog = ({
    area, bgUrl
}: Partial<Props>) => {
    console.log(area);
    
    return (
        <Dialog style={{ backgroundImage: `url(${bgUrl})` }} className={`${area === 'entrance' ? styles.bgDownAnimation : styles.bgRightAnimation }`}>
            <div className={styles.contentBox}>
                <section className={styles.leftContent}>
                    <h1>
                        <span>{firstLetterUppercase(area) + " Zone"}</span>
                    </h1>
                    <Link to={`/world/${area}`} className={styles.admissionButton}>입 장</Link>
                </section>
            </div>
        </Dialog>
    )
}