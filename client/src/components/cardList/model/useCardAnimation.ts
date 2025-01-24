import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

type Size3 = [x: number, y: number, z: number];

const CARD_SIZE = [4, 3.5, 3.5] as Size3;
const CARD_HOVER = 1;
const CARD_ZOOM = 1;

const SMOOTH_TIME = 0.2;
const HOVER_SCALE = 1.1;

export const useCardAnimation = (isHover: boolean) => {
  const cardRef = useRef<any>();

  useFrame((_, delta) => {
    // 카드의 크기를 조절
    const hoveredSize = CARD_SIZE.map((size) => size * HOVER_SCALE) as Size3;
    easing.damp3(
      cardRef.current.scale,
      isHover ? hoveredSize : CARD_SIZE,
      SMOOTH_TIME,
      delta
    );

    // 카드의 border-radius를 조절
    easing.damp(
      cardRef.current.material,
      "radius",
      isHover ? CARD_HOVER * HOVER_SCALE : CARD_HOVER,
      SMOOTH_TIME,
      delta
    );

    // 카드의 zoom-in을 조절
    easing.damp(
      cardRef.current.material,
      "zoom",
      isHover ? CARD_ZOOM * HOVER_SCALE : CARD_ZOOM,
      SMOOTH_TIME,
      delta
    );
  });

  return cardRef;
};
