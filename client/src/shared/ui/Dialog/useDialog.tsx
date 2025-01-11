import { DialogHTMLAttributes, useEffect, useRef } from "react";

import { useDialogStore } from "shared/stores/useDialogStore";

import styles from "./useDialog.module.css";

export const Dialog = (props: DialogHTMLAttributes<HTMLDialogElement>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setDialogBackdrop, setDialogClose } = useDialogStore();

  useEffect(() => {
    const currentDialog = dialogRef.current;
    if(!currentDialog) return;

    currentDialog.showModal();
    currentDialog.addEventListener("close", setDialogClose);

    return () => {
      currentDialog.removeEventListener("close", setDialogClose);
    };
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
