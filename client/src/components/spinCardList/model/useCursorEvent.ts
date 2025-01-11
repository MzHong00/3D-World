import { useCursor } from "@react-three/drei";
import { IntersectionEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useState } from "react";

export const useCursorEvent = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  //카드에 커서 올리면 cursor: pointer
  useCursor(isHover);

  const pointerOver = (e: IntersectionEvent<MouseEvent>) => {
    e.stopPropagation();
    setIsHover(true);
  };

  const pointerOut = () => {
    setIsHover(false);
  };

  return {
    isHover,
    pointerOver,
    pointerOut,
  };
};
