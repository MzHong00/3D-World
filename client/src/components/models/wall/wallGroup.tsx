import { GroupProps } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

import { ZoneFloor } from "components/models/floor/zoneFloor";
import { SideWall } from "components/models/wall/sideWall";

export const WallGroup = (props: GroupProps) => {
  return (
    <group {...props}>
      <RigidBody type="fixed">
        <ZoneFloor args={[28, 66]} />
      </RigidBody>
      <SideWall position={[-14, 0.5 ,0]} />
    </group>
  );
};
