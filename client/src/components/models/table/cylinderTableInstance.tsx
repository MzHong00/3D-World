import { useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { Instance, Instances, useGLTF } from "@react-three/drei";

import { RoundedBoxGeometry } from "shared/ui/BufferGeometry/roundedBoxGeometry";
import chairGlb from "shared/asset/3d/chair.glb";
import ComputerGlb from "shared/asset/3d/generic_monitor_low_poly.glb";

export const CylinderTableInstance = (props: GroupProps) => {
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
    return [
      { x: 1, z: 0 },
      { x: 0.309, z: -0.951 },
      { x: -0.809, z: -0.588 },
      { x: -0.809, z: 0.588 },
      { x: 0.309, z: 0.951 },

      { x: 1, z: -4 },
      { x: 0.309, z: -4.951 },
      { x: -0.809, z: -4.588 },
      { x: -0.809, z: -3.412 },
      { x: 0.309, z: -3.049 },

      { x: 1, z: -8 },
      { x: 0.309, z: -8.951 },
      { x: -0.809, z: -8.588 },
      { x: -0.809, z: -7.412 },
      { x: 0.309, z: -7.049 },
    ];
  }, []);

  return (
    <group {...props}>
      <Instances>
        <cylinderGeometry args={[1, 1, 2]} />
        <meshStandardMaterial />
        <Instance position={[0, 1, 0]} />
      </Instances>
      <Instances>
        <cylinderGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial />
        <Instance position={[0, 1, 0]} />
      </Instances>

      <Instances geometry={roundedBoxGeometry}>
        <meshPhysicalMaterial color="#d6efff" roughness={0} metalness={0.05} />
        {divideSeatPosition.map((pos, idx) => (
          <Instance
            position={[pos.x, 1, pos.z  + Math.floor(idx / 5) * 12]}
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
            position={[pos.x * 1.5, 0, pos.z * 1.5 + Math.floor(idx / 5) * -2]}
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
