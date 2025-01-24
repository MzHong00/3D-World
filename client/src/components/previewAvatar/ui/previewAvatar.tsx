import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";

import { Dialog } from "shared/ui/Dialog/useDialog";
import { useDialogStore } from "shared/stores/useDialogStore";
import { AvatarModel } from "./avatarModel";

import styles from "./previewAvatar.module.css";

export const PreviewAvatar = () => {
  const { setDialog, setDialogOpen } = useDialogStore();

  const onClickShowAvatar = () => {
    setDialog(
      <Dialog className={styles.avatarContainer}>
        <Canvas camera={{ fov: 30 }} style={{ height: "36rem" }}>
          <color attach="background" args={["#FFF5EE"]} />
          <AvatarModel />
        </Canvas>
        <Link to="/create-avatar" className={styles.avatarChangeButton}>
          캐릭터 변경
        </Link>
      </Dialog>
    );

    setDialogOpen();
  };

  return (
    <button className={styles.showAvatarButton} onClick={onClickShowAvatar}>
      캐릭터 보기
    </button>
  );
};
