import type { GroupProps } from "@react-three/fiber";
import { Clone } from "@react-three/drei";

import { type SeatState } from "shared/types/type";
import { useSeatAnimation } from "..";

interface Props extends GroupProps {
  seatPosition: SeatState[];
  consistencyBreakPoint: number;
  itemsPerLine: number;
}

// 좌석에 앉아있는 아바타 (움직이는 기능 X)
export const SeatedPlayer = ({
  seatPosition,
  consistencyBreakPoint,
  itemsPerLine,
  ...props
}: Props) => {
  const { avatarObject } = useSeatAnimation();

  return (
    <group {...props}>
      {seatPosition.map((seat, idx) => {
        const isUTurn =
          Math.floor(
            ((seat.seat.number - 1) % (itemsPerLine * 2)) / itemsPerLine
          ) === 0;

        return seat.seat.number > consistencyBreakPoint ? (
          <Clone
            key={idx}
            object={avatarObject}
            position={[6.3 + seat.x, 0, -2.6 - seat.z]}
            rotation={[0, Math.PI * 1.5, 0]}
          />
        ) : (
          <Clone
            key={idx}
            object={avatarObject}
            position={[seat.x, 0, (isUTurn ? 1.4 : 0.3) - seat.z]}
            rotation={[0, isUTurn ? Math.PI : 0, 0]}
          />
        );
      })}
    </group>
  );
};
