import { useEffect, useRef } from "react";
import { IoCameraReverseSharp } from '@react-icons/all-files/io5/IoCameraReverseSharp'

import styles from "./cameraAdjusting.module.css";
import { useDialogStore } from "stores/useOpenDialogStore";

export const CameraAdjusting = () => {
  const screenFense = useRef<HTMLDivElement>(null);
  const { setDialogClose } = useDialogStore();

  useEffect(() => {
    const handlePointerLockChange = (e: Event) => {
      if (!document.pointerLockElement) {
        if (screenFense.current) {
          screenFense.current.style.display = "flex";
        }
        setDialogClose(e);

        setTimeout(() => {
          if (screenFense.current) {
            screenFense.current.style.display = "none";
          }
        }, 1300);
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    // Cleanup function to remove the event listener
    return () => {
      console.log("pointer Lock 클린업");
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
        <IoCameraReverseSharp size={100}/>
        <p>카메라 조정중...</p>
    </div>
  );
};
