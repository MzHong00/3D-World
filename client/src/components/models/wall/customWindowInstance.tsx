import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

interface Props extends GroupProps {
  windowSize?: Array<Object>;
}

const windowPosition: InstanceProps[] = [
  { position: [6, 0, 22.5], rotation: [0, Math.PI * 0.75, 0] },
  { position: [6, 0, -22.5], rotation: [0, Math.PI * 0.25, 0] },
  { position: [0, 0, 25], rotation: [0, Math.PI / 2, 0] },
  { position: [-6, 0, 22.5], rotation: [0, Math.PI * 0.25, 0] },
  { position: [-6, 0, -22.5], rotation: [0, Math.PI * 0.75, 0] },
  { position: [0, 0, -25], rotation: [0, Math.PI / 2, 0] },
];

export const CustomWindowInstance = ({
  windowSize = [0.1, 2, 7],
  ...props
}: Props) => {
  return (
    <group {...props}>
      <Instances>
        <boxGeometry args={windowSize as any} />
        <meshPhongMaterial emissive="#d8f6fd" />

        {windowPosition.map(({ position, rotation }, idx) => (
          <Instance key={idx} position={position} rotation={rotation} />
        ))}
      </Instances>
    </group>
  );
};
