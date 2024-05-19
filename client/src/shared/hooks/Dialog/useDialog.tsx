import { DialogHTMLAttributes, useEffect, useRef } from 'react';

import styles from './useDialog.module.css';
import { useDialogStore } from 'stores/useOpenDialogStore';

export const Dialog = (props: DialogHTMLAttributes<HTMLDialogElement>) => {
    const dialogRef = useRef<any>(null);
    const { setDialogBackdrop } = useDialogStore(state => state);

    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    return (
        <dialog ref={dialogRef} onClick={setDialogBackdrop} className={`${styles.dialog} ${props.className}`} style={props.style}>
            <div className={styles.dialogContentBox}>
                {props.children}
            </div>
        </dialog>
    )
}