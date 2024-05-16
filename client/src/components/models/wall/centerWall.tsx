import { GroupProps } from "@react-three/fiber";
import { PillarInstance } from "./pillarInstance";
import { WindowInstance } from "./windowInstance";
import { useLayoutEffect, useState } from "react";
import { Coordinate } from "shared/types/type";
import { CustomWindowInstance } from "./customWindowInstance";

export const CenterWall = (props: GroupProps) => {
  const [bigWindowPosition, setBigWindowPosition] = useState<Coordinate[]>([]);
  const [pillarPosition, setPillarPosition] = useState<Coordinate[]>([]);
  useLayoutEffect(() => {
    const initWindow = () => {
      const numberOfBigWindow = 6;
      const bigXGap = 26,
        bigZGap = 13;

      const bigWindowPosition: Coordinate[] = Array.from({
        length: numberOfBigWindow,
      }).map((_, i) => {
        return {
          x: Math.floor(i / 3) * bigXGap - 13,
          z: (i % (numberOfBigWindow / 2)) * bigZGap - 13,
        };
      });
      setBigWindowPosition(bigWindowPosition);
    };

    const initPillar = () => {
      const numberOfPillar = 8;
      const xGap = 26,
        zGap = 13;

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
      <CustomWindowInstance position={[0, 1.5, 0]} />
    </group>
  );
};
