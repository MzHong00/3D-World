import { GroupProps } from "@react-three/fiber";
import { MultiFlexSofa } from "./mulitFlexSofa";

import Monitor from "shared/asset/3d/wall-hanging-monitor.glb";
import { Instance, Instances, useGLTF, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { DoubleSide } from "three";

import WSULogo from "shared/asset/image/wsu-logo.png";

export const MultiFlexZone = (props: GroupProps) => {
  // 우송대 종이 칸막이 4개
  const { nodes, materials }: any = useGLTF(`${Monitor}`);
  const logo = useTexture(`${WSULogo}`);

  const monitorPosition = useRef([
    [0, 44, 35.5],
    [35.5, 44, 0],
    [0, 44, -35.5],
    [-35.5, 44, 0],
  ]);

  const partitionPaperPosition = useRef([
    [0, 1.25, 3],
    [3, 1.25, 0],
    [0, 1.25, -3],
    [-3, 1.25, 0],
  ]);

  return (
    <group {...props}>
      <MultiFlexSofa rotation={[0, Math.PI * 0.35, 0]} />
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2, 2.5, 2]} />
        <meshPhysicalMaterial color="#7859A6" />
      </mesh>
      <Instances
        geometry={nodes.tv_tv_0.geometry}
        material={materials.material}
        scale={0.03}
      >
        {monitorPosition.current.map((position, i) => (
          <Instance
            key={i}
            position={position as any}
            rotation={[0, Math.PI * (0.5 * i), 0]}
          />
        ))}
      </Instances>
      <Instances position={[0, 0.25, 0]} rotation={[0, Math.PI * 0.25, 0]}>
        <planeGeometry args={[2, 2.5]} />
        <meshPhysicalMaterial side={DoubleSide} map={logo} />
        {partitionPaperPosition.current.map((position, i) => (
          <Instance
            key={i}
            position={position as any}
            rotation={[0, Math.PI * (0.5 * i + 0.5), 0]}
          />
        ))}
      </Instances>
    </group>
  );
};
