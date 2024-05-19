import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import ZoneFloorTexture from "shared/asset/image/zoneEntryFloor.png";

interface Props extends MeshProps {
  args: any;
}

export const ZoneEntryFloor = ({ args, ...props }: Partial<Props>) => {
  const zone = useTexture(`${ZoneFloorTexture}`);
  zone.repeat.set(15, 7);
  zone.wrapS = zone.wrapT = THREE.RepeatWrapping;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeGeometry args={args} />
      <meshStandardMaterial map={zone} />
    </mesh>
  );
};
