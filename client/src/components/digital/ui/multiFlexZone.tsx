import { DoubleSide } from "three";
import { GroupProps } from "@react-three/fiber";
import { Instance, Instances, useGLTF, useTexture } from "@react-three/drei";

import Monitor from "shared/asset/3d/wall-hanging-monitor.glb";
import WSULogo from "shared/asset/image/wsu-logo.png";

import { MultiFlexSofa } from "./mulitFlexSofa";
import { MONITOR_POSITION, PARTITION_PAPER_POSITION } from "..";

export const MultiFlexZone = (props: GroupProps) => {
  // 우송대 종이 칸막이 4개
  const { nodes, materials }: any = useGLTF(`${Monitor}`);
  const logo = useTexture(`${WSULogo}`);

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
        {MONITOR_POSITION.map((position, i) => (
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
        {PARTITION_PAPER_POSITION.map((position, i) => (
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
