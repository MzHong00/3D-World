import type { CharSpeed } from "shared/types/type";
import { usePlayerPositionStore } from "shared/stores/usePlayerPositionStore";

import styles from "./map.module.css";

export interface UserStartPosition extends Partial<CharSpeed> {
  userStartPosition?: "left" | "right";
}

export const UserPointer = ({
  xSpeed = 10,
  ySpeed = 10,
}: UserStartPosition) => {
  const { position } = usePlayerPositionStore();

  return (
    <div
      style={{
        transform: `translate(${position.x *xSpeed}px, ${
          position.z * ySpeed
        }px)`,
      }}
      className={`${styles.character}`}
    />
  );
};
