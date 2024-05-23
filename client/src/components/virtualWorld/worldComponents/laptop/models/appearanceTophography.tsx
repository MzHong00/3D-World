import { useMemo, useRef } from "react";
import { GroupProps } from "@react-three/fiber";

import { ZoneConnectFloor } from "components/models/floor/zoneConnectFloor";
import { ZoneTriangleFloor } from "components/models/floor/zoneTriangleFloor";
import { PillarInstance } from "components/models/wall/pillarInstance";
import { WindowInstance } from "components/models/window/windowInstance";
import { Coordinate } from "shared/types/type";
import { ZoneFloor } from "components/models/floor/zoneFloor";
import { SideWall } from "components/models/wall/sideWall";
import { CylinderPillarInstance } from "components/models/wall/cylinderPillarInstance";

export const AppearanceTophography = (props: GroupProps) => {
  const xGap = useRef<number>(17);
  const zGap = useRef<number>(13);

  const windowPosition: Coordinate[] = useMemo(() => {
    const numberOfBigWindow = 6;

    const position: Coordinate[] = Array.from({
      length: numberOfBigWindow,
    }).map((_, i) => {
      return {
        x: Math.floor(i / 3) * xGap.current - 13,
        z: (i % (numberOfBigWindow / 2)) * zGap.current - 13,
      };
    });

    return position;
  }, []);

  const pillarsPosition: Coordinate[] = useMemo(() => {
    const numberOfPillar = 8;

    const position: Coordinate[] = Array.from({ length: numberOfPillar }).map(
      (_, i) => {
        return {
          x: Math.floor(i / (numberOfPillar / 2)) * xGap.current - 13,
          z: (i % (numberOfPillar / 2)) * zGap.current - 19.5,
        };
      }
    );

    return position;
  }, []);

  const doorPosition = useMemo(() => {
    return {
      glassPosition: [
        { x: -4.5, z: -33 },
        { x: -8, z: -33 },
        { x: -1, z: -33 },
      ],
      gripPosition: [
        { x: -7.9, z: -32.9 },
        { x: -8.1, z: -32.9 },
        { x: -0.9, z: -32.9 },
        { x: -1.1, z: -32.9 },
      ],
    };
  }, []);

  return (
    <group {...props}>
      <PillarInstance position={[0, 0, 0]} pillarPosition={pillarsPosition} />
      <WindowInstance
        position={[0, 1, 0]}
        windowPosition={windowPosition}
        windowSize={[0.1, 2, 12]}
      />
      <WindowInstance
        position={[0, 1.5, 0]}
        windowPosition={doorPosition.glassPosition}
        windowSize={[3.45, 3, 0.1]}
      />
      <CylinderPillarInstance
        position={[0, 1.1, 0]}
        pillarSize={[0.03, 0.03, 1.5]}
        pillarPosition={doorPosition.gripPosition}
      >
        <meshPhysicalMaterial color="silver" roughness={0} metalness={1} />
      </CylinderPillarInstance>

      <ZoneConnectFloor />
      <ZoneTriangleFloor />
      <group position={[-27, 0, 0]}>
        <ZoneFloor args={[28, 66]} />
        <SideWall position={[-14, 0.5, 0]} />
      </group>
      <group position={[18.05, 0, 0]} rotation={[0, Math.PI, 0]}>
        <ZoneFloor args={[28, 66]} />
        <SideWall position={[-14, 0.5, 0]} />
      </group>
    </group>
  );
};
