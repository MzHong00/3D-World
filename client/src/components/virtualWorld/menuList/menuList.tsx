import { useEffect } from "react";

import { GrMapLocation } from "@react-icons/all-files/gr/GrMapLocation";
import { RiVidiconFill } from "@react-icons/all-files/ri/RiVidiconFill";
import { RiVidiconLine } from "@react-icons/all-files/ri/RiVidiconLine";

import { useToggle } from "shared/hooks/useToggle";
import { RoundButton } from "shared/ui/Button/roundButton";
import { useCameraModeStore } from "stores/useCameraModeStore";
import { useDialogStore } from "stores/useOpenDialogStore";

import styles from "./menuList.module.css";

export const MenuList = () => {
  const { state: cameraMode, handler: toggleCameraMode } = useToggle({
    initState: true,
  });
  const { setDialogOpen } = useDialogStore();
  const { setModeState } = useCameraModeStore((state) => state);

  useEffect(() => {
    setModeState(cameraMode);
  }, [cameraMode, setModeState]);

  return (
    <nav className={styles.menuContainer}>
      <RoundButton
        className={`${styles.cameraButton} ${!cameraMode && styles.middleCameraModeButton} `}
        onClick={(e) => {
          e.stopPropagation();
          toggleCameraMode();
        }}
      >
        {cameraMode ? (
          <RiVidiconLine className={styles.topCameraModeButton} />
        ) : (
          <RiVidiconFill className={styles.baseCameraButton} />
        )}
      </RoundButton>
      <RoundButton className={styles.mapButton} onClick={setDialogOpen}>
        <GrMapLocation />
      </RoundButton>
    </nav>
  );
};
