import { Instance, Instances } from "@react-three/drei";
import { type GroupProps } from "@react-three/fiber";
import { type Coordinate } from "shared/types/type";

interface Props extends GroupProps {
  pillarPosition: Coordinate[];
  pillarSize: Array<Object>;
}

export const CylinderPillarInstance = ({
  pillarSize = [],
  pillarPosition = [],
  children,
  ...props
}: Props) => {
  return (
    <group {...props}>
      <Instances>
        <cylinderGeometry args={pillarSize as any} />
        {children && children}
        {pillarPosition.map((position, idx) => (
          <Instance key={idx} position={[position.x, 0, position.z]} />
        ))}
      </Instances>
    </group>
  );
};
