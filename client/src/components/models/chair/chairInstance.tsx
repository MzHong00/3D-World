import { GroupProps } from "@react-three/fiber";
import { Instance, Instances, useGLTF } from "@react-three/drei";

import { Coordinate } from "shared/types/type";
import chairGlb from "shared/asset/3d/chair.glb";

interface Props extends GroupProps {
  seatPosition: Coordinate[];
  itemsPerLine: number;
  consistencyBreakPoint: number;
}

export const ChairInstance = ({
  seatPosition,
  itemsPerLine,
  consistencyBreakPoint,
  ...props
}: Props) => {
  const { nodes, materials }: any = useGLTF(`${chairGlb}`);

  return (
    <group {...props}>
      <Instances
        geometry={nodes.office_chair_Material_0.geometry}
        material={materials.Material}
        scale={1.4}
      >
        {seatPosition.map((seat, idx) => {
          if (idx >= consistencyBreakPoint)
            return (
              <Instance
                key={idx}
                position={[seat.x, 0, -seat.z]}
                rotation={[Math.PI * 1.5, 0, Math.PI / 2]}
              />
            );

          return Math.floor((idx % (itemsPerLine * 2)) / itemsPerLine) === 0 ? (
            <Instance
              key={idx}
              position={[seat.x, 0, 1 - seat.z]}
              rotation={[Math.PI * 1.5, 0, 0]}
            />
          ) : (
            <Instance
              key={idx}
              position={[seat.x, 0, -seat.z]}
              rotation={[Math.PI * 1.5, 0, Math.PI]}
            />
          );
        })}
      </Instances>
    </group>
  );
};
