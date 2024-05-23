import { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { Instance, Instances, useGLTF } from "@react-three/drei";

import { RoundedBoxGeometry } from "shared/ui/BufferGeometry/roundedBoxGeometry";
import chairGlb from "shared/asset/3d/chair.glb";
import ComputerGlb from "shared/asset/3d/generic_monitor_low_poly.glb";
import { Coordinate } from "shared/types/type";

interface Props extends GroupProps {
  numberOfTable: number;
}

export const CylinderTableInstance = ({ numberOfTable, ...props }: Props) => {
  const { nodes: chairNodes, materials: chairMaterials }: any = useGLTF(
    `${chairGlb}`
  );
  const { nodes: monitorNodes, materials: monitorMaterials }: any = useGLTF(
    `${ComputerGlb}`
  );

  const roundedBoxGeometry = useMemo(
    () => new RoundedBoxGeometry(2.5, 1.7, 0.05),
    []
  );

  const divideSeatPosition = useMemo(() => {
    const zGap = -6;
    const pentagonPos = [
      { x: 1, z: 0 },
      { x: 0.309, z: -0.951 },
      { x: -0.809, z: -0.588 },
      { x: -0.809, z: 0.588 },
      { x: 0.309, z: 0.951 },
    ];
    const numberOfSeat = pentagonPos.length;

    const allCylinderTablePosition: Coordinate[] = Array.from({
      length: numberOfSeat * numberOfTable,
    }).map((_, i) => ({
      x: pentagonPos[i % numberOfSeat].x,
      z: pentagonPos[i % numberOfSeat].z + zGap * Math.floor(i / numberOfSeat),
    }));

    return allCylinderTablePosition;
  }, [numberOfTable]);

  return (
    <group {...props}>
      <Instances>
        <cylinderGeometry args={[1, 1, 2]} />
        <meshStandardMaterial />
        {Array.from({ length: numberOfTable }).map((_, i) => (
          <Instance key={i} position={[0, 1, i * 12]} />
        ))}
      </Instances>
      <Instances>
        <cylinderGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial />
        {Array.from({ length: numberOfTable }).map((_, i) => (
          <Instance key={i} position={[0, 1, i * 12]} />
        ))}
      </Instances>

      <Instances geometry={roundedBoxGeometry}>
        <meshPhysicalMaterial color="#d6efff" roughness={0} metalness={0.05} />
        {divideSeatPosition.map((pos, idx) => (
          <Instance
            key={idx}
            position={[pos.x, 1, pos.z + Math.floor(idx / 5) * 18]}
            rotation={[0, Math.PI * ((idx % 5) * 0.4), 0]}
          />
        ))}
      </Instances>
      <Instances
        geometry={chairNodes.office_chair_Material_0.geometry}
        material={chairMaterials.Material}
        rotation={[0, Math.PI, 0]}
      >
        {divideSeatPosition.map((pos, idx) => (
          <Instance
            key={idx}
            position={[pos.x * 2, 0, pos.z * 2]}
            rotation={[
              Math.PI * 1.5,
              0,
              Math.PI * ((idx % 5) * 0.4) + Math.PI * 0.5,
            ]}
          />
        ))}
      </Instances>
      <Instances
        geometry={monitorNodes.defaultMaterial.geometry}
        material={monitorMaterials.Material}
        position={[0, 1.05, 0]}
        rotation={[0, Math.PI, 0]}
      >
        {divideSeatPosition.map((pos, idx) => (
          <Instance
            key={idx}
            position={[
              pos.x * 1.5,
              0,
              pos.z * 1.668 + Math.floor(idx / 5) * -2,
            ]}
            rotation={[
              Math.PI * 1.5,
              0,
              Math.PI * ((idx % 5) * 0.4) + Math.PI * 1.5,
            ]}
          />
        ))}
      </Instances>
    </group>
  );
};
