import { useEffect } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

import personModel from "shared/asset/3d/man.glb";
import sitAnimation from "shared/asset/animations/Sitting.fbx";

export const useSeatAnimation = () => {
  const { scene: avatarObject } = useGLTF(`${personModel}`);
  const { animations: sit } = useFBX(sitAnimation);

  const { actions: sitAction } = useAnimations(sit, avatarObject);

  useEffect(() => {
    sitAction["mixamo.com"]?.play();
  }, [sitAction]);

  return { avatarObject };
};
