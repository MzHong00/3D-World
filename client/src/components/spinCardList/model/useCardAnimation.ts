import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

export const useCardAnimation = (isHover: boolean) => {
  const cardRef = useRef<any>();

  useFrame((_, delta) => {
    //args 2: 값이 클수록 카드가 커짐
    easing.damp3(cardRef.current.scale, isHover ? [2.5, 2, 2] : 2, 0.1, delta);
    //args 2: 값이 클수록 카드가 둥글어짐
    easing.damp(
      cardRef.current.material,
      "radius",
      isHover ? 0.03 : 0.05,
      0.2,
      delta
    );
    //args 2: 값이 클수록 Zoom In
    easing.damp(
      cardRef.current.material,
      "zoom",
      isHover ? 1.2 : 1,
      0.2,
      delta
    );
  });

  return cardRef;
};
