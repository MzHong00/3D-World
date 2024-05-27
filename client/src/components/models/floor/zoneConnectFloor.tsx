import { useMemo } from "react";
import * as THREE from "three";
import { Instance, Instances, useTexture } from "@react-three/drei";

import ZoneFloorTexture from "shared/asset/image/zoneEntryFloor.png";

export const ZoneConnectFloor = () => {
  const zone = useTexture(`${ZoneFloorTexture}`);
  zone.repeat.set(15, 7);
  zone.wrapS = zone.wrapT = THREE.RepeatWrapping;

  const floorPosition = useMemo(() => {
    return [[-4.45, 0, 29.025], [-4.45, 0, -29.025]]
  }, []);

  return (
    <Instances>
      <planeGeometry args={[17.1, 7.95]} />
      <meshStandardMaterial map={zone} />
      {floorPosition.map((position, idx) => <Instance key={idx} position={position as any} rotation={[Math.PI * 1.5, 0, 0]} />)}
    </Instances>
  );
};
