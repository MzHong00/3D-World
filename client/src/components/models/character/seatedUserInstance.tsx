import { useEffect } from "react";
import { GroupProps } from "@react-three/fiber";
import { Clone, useAnimations, useFBX, useGLTF } from "@react-three/drei";

import { type SeatState } from "shared/types/type";
import personModel from "shared/asset/3d/man.glb";
import sitAnimation from "shared/asset/animations/Sitting.fbx";

interface Props extends GroupProps {
  seatPosition: SeatState[];
  consistencyBreakPoint: number;
  itemsPerLine: number;
}

export const SeatedUserInstance = ({
  seatPosition,
  consistencyBreakPoint,
  itemsPerLine,
  ...props
}: Props) => {
  const { scene } = useGLTF(`${personModel}`);
  const { animations: sit } = useFBX(sitAnimation);

  const { actions: sitAction } = useAnimations(sit, scene);

  useEffect(() => {
    sitAction["mixamo.com"]?.play();
  }, [sitAction]);

  return (
    <group {...props}>
      {seatPosition.map((seat, idx) => {
        const isUTurn =
          Math.floor(
            ((seat.seat.number - 1) % (itemsPerLine * 2)) / itemsPerLine
          ) === 0;

        if (seat.seat.number > consistencyBreakPoint)
          return (
            <Clone
              key={idx}
              object={scene}
              position={[6.3 + seat.x, 0, -2.6 - seat.z]}
              rotation={[0, Math.PI * 1.5, 0]}
            />
          );

        return (
          <Clone
            key={idx}
            object={scene}
            position={[seat.x, 0, (isUTurn ? 1.4 : 0.3) - seat.z]}
            rotation={[0, isUTurn ? Math.PI : 0, 0]}
          />
        );
      })}
    </group>
  );
};
