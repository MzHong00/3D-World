import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { BsGear } from "@react-icons/all-files/bs/BsGear";

import { usePerformanceMode } from "stores/usePerformanceMode";
import { RoundButton } from "shared/ui/Button/roundButton";
import { useToggle } from "shared/hooks/useToggle";
import styles from "./topNavBar.module.css";

export const TopNavBar = () => {
  const { state: isNavBarOpen, handler: setIsNavBarOpen } = useToggle();
  const { PerformanceMode, setPerformanceMode } = usePerformanceMode();
  const navigate = useNavigate();

  const onClickToggleButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsNavBarOpen();
  };

  const onClickSetPerformanceMode = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const isLowMode = PerformanceMode === "low" ? true : false;

    setPerformanceMode(isLowMode ? "high" : "low");
  };

  const onClickToHome = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate("/");
  };

  return (
    <nav className={styles.topNavBarContainer}>
      <RoundButton
        className={styles.navToggleButton}
        onClick={onClickToggleButton}
      >
        <BsGear />
      </RoundButton>
      {isNavBarOpen && (
        <div className={styles.topNavBarListContainer}>
          <li
            className={styles.topNavBarList}
            onClick={onClickSetPerformanceMode}
          >
            <input
              readOnly
              type="checkbox"
              style={{ pointerEvents: "none" }}
              checked={PerformanceMode === "low" ? true : false}
            />
            <span>저사양 모드 활성화</span>
          </li>
          <li className={styles.topNavBarList} onClick={onClickToHome}>
            <IoExitOutline size={18} />
            <span>홈으로</span>
          </li>
        </div>
      )}
    </nav>
  );
};
