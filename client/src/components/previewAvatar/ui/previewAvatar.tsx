import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft";

import { useToggle } from "shared/hooks/useToggle";
import { AvatarModel } from "./avatarModel";

import styles from "./previewAvatar.module.css";

export const PreviewAvatar = () => {
  const { state: isOpen, handler: toggleHandler } = useToggle();

  return (
    <nav
      className={styles.previewContainer}
      style={{
        transform: `${isOpen ? "translateX(-105%)" : "translateX(-5rem)"}`,
      }}
    >
      {isOpen ? (
        <div
          className={`${styles.showAvatarButton} ${styles.bounceAnimation}`}
          onClick={toggleHandler}
        >
          <BsArrowLeft size={30} />
        </div>
      ) : (
        <div className={styles.showAvatarButton} onClick={toggleHandler}>
          <BsArrowRight size={30} />
        </div>
      )}
      <div className={styles.avatarContainer}>
        <Canvas camera={{ fov: 25 }} style={{ height: "36rem" }}>
          <color attach="background" args={["#FFF5EE"]} />
          <AvatarModel />
        </Canvas>
        <Link to="/create-avatar" className={styles.avatarChangeButton}>
          캐릭터 변경
        </Link>
      </div>
    </nav>
  );
};
