import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { useCameraModeStore } from "shared/stores/useCameraModeStore";
import { usePlayerAnimation } from "..";

// 기본 플레이어 아바타
export const Player = () => {
  const { modeState } = useCameraModeStore();
  const { playerRef, avatarObject } = usePlayerAnimation();

  return (
    <RigidBody
      ref={playerRef}
      position={[0, 0, 0]}
      mass={1}
      colliders={false}
      lockRotations
    >
      <CuboidCollider args={[0.3, 1, 0.3]}>
        <primitive
          visible={modeState && "invisible"}
          object={avatarObject}
          position={[0, -1, 0]}
        />
      </CuboidCollider>
    </RigidBody>
  );
};
