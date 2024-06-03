import { useRef, useState } from "react";
import * as THREE from "three";
import { Text, Image, Shadow, useCursor } from "@react-three/drei";
import { type Euler, type Vector3, useFrame } from "@react-three/fiber";
import { IntersectionEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { easing } from "maath";

import { DetailAreaDialog } from "../dialog/detailAreaDialog";
import { useDialogStore } from "stores/useOpenDialogStore";
import { type Area } from "shared/types/type";

interface Props {
  area: Area;
  position: Vector3;
  rotation: Euler;
}

export const Card = ({ area, position, rotation }: Props) => {
  const cardRef = useRef<any>();

  const { setDialog, setDialogOpen } = useDialogStore();

  const [mouseDownPosX, setMouseDownPosX] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);

  //카드에 커서 올리면 cursor: pointer
  useCursor(hover);

  const pointerOver = (e: IntersectionEvent<MouseEvent>) => {
    e.stopPropagation();
    setHover(true);
  };
  const pointerOut = () => {
    setHover(false);
  };

  //카드 리스트가 정지한 상태에서만 카드가 클릭되게 함
  const pointerUp = (e: IntersectionEvent<MouseEvent>) => {
    e.stopPropagation();
    const mouseInterval = Math.abs(mouseDownPosX - e.pointer.x);
    if (mouseInterval > 0.05) return;

    setDialog(<DetailAreaDialog {...area} />);
    setDialogOpen();
  };
  const pointerDown = (e: IntersectionEvent<MouseEvent>) => {
    e.stopPropagation();
    setMouseDownPosX(e.pointer.x);
  };

  useFrame((state, delta) => {
    //args 2: 값이 클수록 카드가 커짐
    easing.damp3(cardRef.current.scale, hover ? [2.5, 2, 2] : 2, 0.1, delta);
    //args 2: 값이 클수록 카드가 둥글어짐
    easing.damp(
      cardRef.current.material,
      "radius",
      hover ? 0.03 : 0.05,
      0.2,
      delta
    );
    //args 2: 값이 클수록 Zoom In
    easing.damp(cardRef.current.material, "zoom", hover ? 1.2 : 1, 0.2, delta);
  });

  return (
    <group position={position} rotation={rotation}>
      <Image
        scale={2}
        ref={cardRef}
        url={area.bgUrl}
        transparent
        side={THREE.DoubleSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        onPointerUp={pointerUp}
        onPointerDown={pointerDown}
      >
        <Shadow
          scale={[0.8, 0.2, 1]}
          position={[0, -1, 0]}
          colorStop={0.2}
          opacity={0.05}
        />
      </Image>
      <Text color="black" scale={0.3} position={[-0.7, 0.7, 0.1]}>
        {area.floor}
      </Text>
    </group>
  );
};
