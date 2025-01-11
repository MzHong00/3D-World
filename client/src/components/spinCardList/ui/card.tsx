import * as THREE from "three";
import { Text, Image, Shadow } from "@react-three/drei";
import type { Euler, Vector3 } from "@react-three/fiber";

import type { Area } from "shared/types/type";
import { DetailAreaDialog } from "components/dialog";
import { useDialogStore } from "shared/stores/useDialogStore";
import { useCardAnimation } from "../model/useCardAnimation";
import { useCursorEvent } from "../model/useCursorEvent";

interface Props {
  area: Area;
  position: Vector3;
  rotation: Euler;
}

export const Card = ({ area, position, rotation }: Props) => {
  const { setDialog, setDialogOpen } = useDialogStore();
  const { isHover, pointerOut, pointerOver } = useCursorEvent();
  const cardRef = useCardAnimation(isHover);

  const openDialog = () => {
    setDialog(<DetailAreaDialog {...area} />);
    setDialogOpen();
  };

  return (
    <group position={position} rotation={rotation}>
      <Image
        scale={2}
        ref={cardRef}
        url={area.bgUrl}
        transparent
        side={THREE.DoubleSide}
        onClick={openDialog}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
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
