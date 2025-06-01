import { GroupProps } from "@react-three/fiber";
import { Box, Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import { CustomWindowInstance } from "shared/ui/Window/customWindowInstance";

export const ColliderTophography = (props: GroupProps) => {
  return (
    <group {...props}>
      <CustomWindowInstance position={[-4.5, 1, 0]} />
      <RigidBody type="fixed" position={[-4, 0, 0]} includeInvisible>
        <Plane
          args={[73, 66]}
          rotation={[Math.PI * 1.5, 0, 0]}
          visible={false}
        />
      </RigidBody>
      <RigidBody type="fixed" position={[-4.5, 0, 0]} includeInvisible>
        <Box args={[18, 1, 40]} visible={false} />
      </RigidBody>
      <RigidBody type="fixed" position={[-4.5, 1.5, -33.05]}>
        <mesh>
          <boxGeometry args={[74, 3, 0.1]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
};
