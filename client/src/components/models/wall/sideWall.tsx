import { useLayoutEffect, useRef, useState } from "react";
import { type GroupProps } from "@react-three/fiber";

import { PillarInstance } from "./pillarInstance";
import { WindowInstance } from "../window/windowInstance";
import { LaidPillar } from "./laidPillar";
import { type Coordinate } from "shared/types/type";

export const SideWall = (props: GroupProps) => {
  const [pillarPosition, setPillarPosition] = useState<Coordinate[]>([]);
  const [windowPosition, setWindowPosition] = useState<Coordinate[]>([]);

  const windowWidth = useRef<number>(3.325);

  useLayoutEffect(() => {
    const initPillarPosition = () => {
      const numberOfPillar = 9;
      const hallZSize = 66;

      const position: Coordinate[] = Array.from({ length: numberOfPillar }).map(
        (_, i) => {
          return {
            x: 0,
            z: i * ((hallZSize - 1) / (numberOfPillar - 1)),
          };
        }
      );

      setPillarPosition(position);
    };

    const initWindowPosition = () => {
      const numberOfWindow = 16;
      const sliceGroup = 2;

      const position: Coordinate[] = Array.from({ length: numberOfWindow }).map(
        (_, i) => {
          const space = Math.floor(i / sliceGroup) * 1.5;
          const thinSpace = i % sliceGroup === 0 ? -0.5 : 0;
          return {
            x: 0,
            z: i * windowWidth.current + space + 2.5 + thinSpace,
          };
        }
      );

      setWindowPosition(position);
    };

    initPillarPosition();
    initWindowPosition();
  }, []);

  return (
    <group {...props}>
      <LaidPillar />
      <PillarInstance
        position={[0, 0.5, -32.5]}
        pillarPosition={pillarPosition}
      />
      <WindowInstance
        position={[-0.5, 0.95, -32.5]}
        windowSize={[0.1, 1, windowWidth.current]}
        windowPosition={windowPosition}
      />
      <WindowInstance
        position={[-0.5, 2, -32.5]}
        windowSize={[0.1, 1, windowWidth.current]}
        windowPosition={windowPosition}
      />
    </group>
  );
};
