import { GroupProps } from "@react-three/fiber";

import { ZoneFloor } from "components/models/floor/zoneFloor";
import { SideWall } from "components/models/wall/sideWall";

export const WallGroup = (props: GroupProps) => {
  return (
    <group {...props}>
      <ZoneFloor args={[28, 66]} />
      <SideWall position={[-14, 0.5, 0]} />
    </group>
  );
};
