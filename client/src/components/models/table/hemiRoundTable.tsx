import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

export const HemiRoundTable = (props: GroupProps) => {
  return (
    <group {...props}>
      <mesh position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 1, 50, 1, true, 0, Math.PI]} />
        <meshStandardMaterial side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <cylinderGeometry args={[3.3, 3.3, 1, 50, 1, true, 0, Math.PI]} />
        <meshStandardMaterial roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI * 1.5, 0, 0]}>
        <ringGeometry args={[2.5, 3.3, 50, 1, 0, Math.PI]} />
        <meshPhysicalMaterial roughness={0.2} metalness={1} />
      </mesh>
      <mesh position={[-2.9, -0.5, 0]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="silver" />
      </mesh>
      <mesh position={[2.9, -0.5, 0]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="silver" />
      </mesh>
    </group>
  );
};
