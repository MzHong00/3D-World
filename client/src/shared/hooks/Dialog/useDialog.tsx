import { useEffect, useRef } from 'react';
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

import styles from './useDialog.module.css';
import { useDialogStore } from 'stores/useOpenDialogStore';

export const Dialog = ({
    children, ...props
}: any) => {
    const dialogRef = useRef<any>(null);
    const { setDialogClose, setDialogBackdrop } = useDialogStore(state => state);

    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    return (
        <dialog ref={dialogRef} onClick={setDialogBackdrop} className={`${styles.dialog} ${props.className}`} style={props.style}>
            <div className={styles.dialogContentBox}>
                <div className={styles.floatingCloseButton}>
                    <IoMdClose onClick={setDialogClose} className={styles.closeButton} />
                </div>
                {children}
            </div>
        </dialog>
    )
}