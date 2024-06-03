import { DialogHTMLAttributes, useEffect, useRef } from "react";

import { useDialogStore } from "stores/useOpenDialogStore";
import styles from "./useDialog.module.css";

export const Dialog = (props: DialogHTMLAttributes<HTMLDialogElement>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setDialogBackdrop, setDialogClose } = useDialogStore();

  useEffect(() => {
    dialogRef.current!.showModal();
    dialogRef.current!.addEventListener("close", setDialogClose);
  }, [setDialogClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={setDialogBackdrop}
      className={`${styles.dialog} ${props.className}`}
      style={props.style}
    >
      <div className={styles.dialogContentBox}>{props.children}</div>
    </dialog>
  );
};
