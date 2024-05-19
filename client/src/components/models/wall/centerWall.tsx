import { GroupProps } from "@react-three/fiber";
import { PillarInstance } from "./pillarInstance";
import { WindowInstance } from "./windowInstance";
import { useLayoutEffect, useState } from "react";
import { Coordinate } from "shared/types/type";
import { CustomWindowInstance } from "./customWindowInstance";
import { RigidBody } from "@react-three/rapier";
import { ZoneEntryFloor } from "../floor/zoneEntryFloor";

export const CenterWall = (props: GroupProps) => {
  const [bigWindowPosition, setBigWindowPosition] = useState<Coordinate[]>([]);
  const [pillarPosition, setPillarPosition] = useState<Coordinate[]>([]);
  
  useLayoutEffect(() => {
    const xGap = 17,
      zGap = 13;

    const initWindow = () => {
      const numberOfBigWindow = 6;

      const bigWindowPosition: Coordinate[] = Array.from({
        length: numberOfBigWindow,
      }).map((_, i) => {
        return {
          x: Math.floor(i / 3) * xGap - 13,
          z: (i % (numberOfBigWindow / 2)) * zGap - 13,
        };
      });
      setBigWindowPosition(bigWindowPosition);
    };

    const initPillar = () => {
      const numberOfPillar = 8;

      const position: Coordinate[] = Array.from({ length: numberOfPillar }).map(
        (_, i) => {
          return {
            x: Math.floor(i / (numberOfPillar / 2)) * xGap - 13,
            z: (i % (numberOfPillar / 2)) * zGap - 19.5,
          };
        }
      );

      setPillarPosition(position);
    };

    initPillar();
    initWindow();
  }, []);

  return (
    <group {...props}>
      <PillarInstance pillarPosition={pillarPosition} />
      <WindowInstance
        position={[0, 1.5, 0]}
        windowPosition={bigWindowPosition}
        windowSize={[0.1, 2, 12]}
      />
      <CustomWindowInstance position={[-4.5, 1.5, 0]} />
      <RigidBody>
        <ZoneEntryFloor args={[17.1, 7.95]} position={[-4.45, 0.75, 29.025]}/>
      </RigidBody>
      <RigidBody>
        <ZoneEntryFloor args={[17.1, 7.95]} position={[-4.45, 0.75, -29.025]}/>
      </RigidBody>
    </group>
  );
};
