import { GroupProps } from "@react-three/fiber";
import {
  InstancedRigidBodies,
  InstancedRigidBodyProps,
} from "@react-three/rapier";
import { useMemo } from "react";

export const CustomWindowInstance = (props: GroupProps) => {
  const windowPosition: InstancedRigidBodyProps[] = useMemo(
    () => [
      { key: 1, position: [6, 0, 22.5], rotation: [0, Math.PI * 0.75, 0] },
      { key: 2, position: [6, 0, -22.5], rotation: [0, Math.PI * 0.25, 0] },
      { key: 3, position: [0, 0, 25], rotation: [0, Math.PI / 2, 0] },
      { key: 4, position: [-6, 0, 22.5], rotation: [0, Math.PI * 0.25, 0] },
      { key: 5, position: [-6, 0, -22.5], rotation: [0, Math.PI * 0.75, 0] },
      { key: 6, position: [0, 0, -25], rotation: [0, Math.PI / 2, 0] },
    ],
    []
  );
  return (
    <group {...props}>
      <InstancedRigidBodies
        instances={windowPosition}
        colliders="cuboid"
        type="fixed"
      >
        <instancedMesh args={[undefined, undefined, 6]} count={6}>
          <boxGeometry args={[0.1, 2, 7]} />
          <meshPhysicalMaterial
            color="#bee5fe"
            roughness={0.3}
            metalness={0.9}
          />
        </instancedMesh>
      </InstancedRigidBodies>
    </group>
  );
};
