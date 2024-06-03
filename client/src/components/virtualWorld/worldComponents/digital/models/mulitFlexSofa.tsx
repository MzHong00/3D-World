import { useRef } from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";

export const MultiFlexSofa = (props: GroupProps) => {
  const chairColor = useRef("gray");

  return (
    <group {...props}>
      <Instances position={[0, 0.25, 0]}>
        <cylinderGeometry
          args={[4.3, 4.3, 0.5, 50, 1, true, 0, Math.PI * 0.3]}
        />
        <meshPhysicalMaterial
          color={chairColor.current}
          side={THREE.BackSide}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <Instance key={i} rotation={[0, Math.PI * (i * 0.5), 0]} />
        ))}
      </Instances>

      <Instances position={[0, 1, 0]}>
        <cylinderGeometry args={[5, 5, 2, 50, 1, true, 0, Math.PI * 0.3]} />
        <meshPhysicalMaterial
          color={chairColor.current}
          side={THREE.DoubleSide}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <Instance key={i} rotation={[0, Math.PI * (i * 0.5), 0]} />
        ))}
      </Instances>

      <Instances position={[0, 1, 0]}>
        <cylinderGeometry args={[5.5, 5.5, 2, 50, 1, true, 0, Math.PI * 0.3]} />
        <meshPhysicalMaterial
          color={chairColor.current}
          side={THREE.DoubleSide}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <Instance key={i} rotation={[0, Math.PI * (i * 0.5), 0]} />
        ))}
      </Instances>

      <Instances position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.3, 5, 50, 1, Math.PI * 0.2, Math.PI * 0.3]} />
        <meshPhysicalMaterial
          color={chairColor.current}
          side={THREE.DoubleSide}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <Instance key={i} rotation={[0, 0, Math.PI * (i * 0.5)]} />
        ))}
      </Instances>

      <Instances position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5, 5.5, 50, 1, Math.PI * 0.2, Math.PI * 0.3]} />
        <meshPhysicalMaterial
          color={chairColor.current}
          side={THREE.DoubleSide}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <Instance key={i} rotation={[0, 0, Math.PI * (i * 0.5)]} />
        ))}
      </Instances>

      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} rotation={[0, Math.PI * (i * 0.5), 0]}>
          <mesh position={[0, 0.25, 4.65]} rotation={[0, Math.PI * 1.5, 0]}>
            <planeGeometry args={[0.7, 0.5]} />
            <meshPhysicalMaterial
              color={chairColor.current}
              side={THREE.FrontSide}
            />
          </mesh>
          <mesh
            position={[3.761, 0.25, 2.734]}
            rotation={[0, Math.PI * 0.8, 0]}
          >
            <planeGeometry args={[0.7, 0.5]} />
            <meshPhysicalMaterial
              color={chairColor.current}
              side={THREE.FrontSide}
            />
          </mesh>
        </group>
      ))}

      {Array.from({ length: 4 }).map((_, i) => (
        <group key={i} rotation={[0, Math.PI * (i * 0.5), 0]}>
          <mesh position={[0, 1, 5.25]} rotation={[0, Math.PI * 1.5, 0]}>
            <planeGeometry args={[0.5, 2]} />
            <meshPhysicalMaterial
              color={chairColor.current}
              side={THREE.FrontSide}
            />
          </mesh>
          <mesh position={[4.25, 1, 3.085]} rotation={[0, Math.PI * 0.8, 0]}>
            <planeGeometry args={[0.5, 2]} />
            <meshPhysicalMaterial
              color={chairColor.current}
              side={THREE.FrontSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
