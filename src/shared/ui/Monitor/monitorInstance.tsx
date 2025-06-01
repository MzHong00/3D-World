import { Instance, Instances, useGLTF } from "@react-three/drei";
import { type GroupProps } from "@react-three/fiber";

import { Coordinate } from "shared/types/type";
import ComputerGlb from "shared/asset/3d/generic_monitor_low_poly.glb";

interface Props extends GroupProps {
  seatPosition: Coordinate[];
  itemsPerLine: number;
}

export const MonitorInstance = ({
  seatPosition,
  itemsPerLine,
  ...props
}: Props) => {
  const { nodes, materials }: any = useGLTF(`${ComputerGlb}`);

  return (
    <group {...props}>
      <Instances
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Material}
        scale={1.43}
      >
        {seatPosition.map((seat, idx) => {
          return Math.floor((idx % (itemsPerLine * 2)) / itemsPerLine) === 0 ? (
            <Instance
              key={idx}
              position={[seat.x * 0.98, 0.74, (1 - seat.z) * 0.98 - 0.8]}
              rotation={[Math.PI * 1.5, 0, Math.PI]}
            />
          ) : (
            <Instance
              key={idx}
              position={[seat.x * 0.98, 0.74, -seat.z * 0.98 + 0.8]}
              rotation={[Math.PI * 1.5, 0, 0]}
            />
          );
        })}
      </Instances>
    </group>
  );
};
