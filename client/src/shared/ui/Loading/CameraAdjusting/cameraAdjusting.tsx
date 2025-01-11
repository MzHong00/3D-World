import { useEffect, useRef } from "react";
import { IoCameraReverseSharp } from "@react-icons/all-files/io5/IoCameraReverseSharp";

import { useDialogStore } from "shared/stores/useDialogStore";

import styles from "./cameraAdjusting.module.css";

export const CameraAdjusting = () => {
  const screenFense = useRef<HTMLDivElement>(null);
  const { setDialogClose } = useDialogStore();

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (!document.pointerLockElement) {
        if (screenFense.current) {
          screenFense.current.style.display = "flex";
        }
        setDialogClose();

        setTimeout(() => {
          if (screenFense.current) {
            screenFense.current.style.display = "none";
          }
        }, 1300);
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [setDialogClose]);

  return (
    <div
      ref={screenFense}
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
    >
      <IoCameraReverseSharp size={100} />
      <p>카메라 조정중...</p>
    </div>
  );
};
