import { useEffect } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

import { useAvatarStore } from "shared/stores/useAvatarStore";
import StandingFBX from "shared/asset/animations/Standing.fbx";

export const useStandAnimation = () => {
  const { avatar } = useAvatarStore();
  const { scene: avatarObject } = useGLTF(`${avatar}`);
  const { animations: standing } = useFBX(StandingFBX);
  const { actions: standingAction } = useAnimations(standing, avatarObject);

  useEffect(() => {
    const standingAnimation = standingAction["mixamo.com"];
    standingAnimation?.play();
  }, [standingAction]);

  return { avatarObject };
};
