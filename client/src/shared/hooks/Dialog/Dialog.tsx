import { useEffect, useRef, type ReactNode } from 'react';
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { useDialogStore } from 'stores/useStore';

import styles from './Dialog.module.css';

interface Props {
    children: ReactNode
    style: React.CSSProperties
}

export const Dialog = ({
    children, style
}: Partial<Props>) => {
    const dialogRef = useRef<any>(null);
    const { closeButton, clickBackdrop } = useDialogStore(state => state);

    useEffect(() => {
        dialogRef.current.showModal()
    }, [])
    
    return (
        <dialog ref={dialogRef} onClick={clickBackdrop} className={styles.dialog} style={style}>
            <div className={styles.dialogContentBox}>
                <div className={styles.floatingCloseButton}>
                    <IoMdClose onClick={closeButton } className={styles.closeButton}/>
                </div>
                {children}
            </div>
        </dialog>
    )
}