import { Link } from "react-router-dom"
import { Dialog } from "shared/hooks/Dialog/Dialog"

import styles from './detailAreaDialog.module.css'
import { firstLetterUppercase } from "shared/utils/firstLetterUp"
interface Props {
    area: string
    bgUrl: string
}

export const DetailAreaDialog = ({
    area, bgUrl
}: Partial<Props>) => {

    return (
        <Dialog style={{ backgroundImage: `url(${bgUrl})` }}>
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