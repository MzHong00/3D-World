import { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

import WalkingFBX from "shared/asset/animations/Walking.fbx";
import StandingFBX from "shared/asset/animations/Standing.fbx";
import { useMoving } from "..";
import { RapierRigidBody } from "@react-three/rapier";
import { useAvatarStore } from "shared/stores/useAvatarStore";

export const usePlayerAnimation = () => {
  const avatar = useAvatarStore((state) => state.avatar);

  const playerRef = useRef<RapierRigidBody>(null);
  const { scene: avatarObject } = useGLTF(`${avatar}`);

  const { animations: standing } = useFBX(StandingFBX);
  const { animations: walking } = useFBX(WalkingFBX);

  const { actions: standingAction } = useAnimations(standing, avatarObject);
  const { actions: walkingAction } = useAnimations(walking, avatarObject);

  const { isMoving } = useMoving(playerRef);

  useEffect(() => {
    const standingAnimation = standingAction["mixamo.com"];
    const walkingAnimation = walkingAction["mixamo.com"];
    if (isMoving) {
      walkingAnimation?.play();
    } else {
      walkingAnimation?.stop();
      standingAnimation?.play();
    }
  }, [standingAction, walkingAction, isMoving]);

  return { playerRef, avatarObject };
};
