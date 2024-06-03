import { GrMapLocation } from "@react-icons/all-files/gr/GrMapLocation";
import { RiVidiconFill } from "@react-icons/all-files/ri/RiVidiconFill";
import { RiVidiconLine } from "@react-icons/all-files/ri/RiVidiconLine";
import { BsChatDots } from "@react-icons/all-files/bs/BsChatDots";

import { Chat } from "../chat/chat";
import { useCameraModeStore } from "stores/useCameraModeStore";
import { useDialogStore } from "stores/useOpenDialogStore";
import { RoundButton } from "shared/ui/Button/roundButton";
import { useToggle } from "shared/hooks/useToggle";

import styles from "./bottomNavBar.module.css";

export const BottomNavBar = () => {
  const { state: isTopCameraMode, handler: handleCameraMode } = useToggle({
    initState: true,
  });
  const { state: isChatOpen, handler: handleChatOpen } = useToggle();

  const { setDialogOpen } = useDialogStore();
  const { setModeState } = useCameraModeStore();

  const onClickCameraMode = () => {
    handleCameraMode();
    setModeState(!isTopCameraMode);
  };

  return (
    <nav
      className={styles.bottomNavBarContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <RoundButton className={styles.menuButton} onClick={handleChatOpen}>
        <BsChatDots />
      </RoundButton>
      {isChatOpen && <Chat />}
      <RoundButton
        className={`${styles.menuButton} ${
          !isTopCameraMode && styles.middleCameraModeButton
        } `}
        onClick={onClickCameraMode}
      >
        {isTopCameraMode ? (
          <RiVidiconLine className={styles.topCameraModeImage} />
        ) : (
          <RiVidiconFill />
        )}
      </RoundButton>
      <RoundButton className={styles.menuButton} onClick={setDialogOpen}>
        <GrMapLocation />
      </RoundButton>
    </nav>
  );
};
