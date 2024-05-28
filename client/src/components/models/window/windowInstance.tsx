import { Instance, Instances } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Coordinate } from "shared/types/type";

interface Props extends GroupProps {
  windowPosition: Coordinate[];
  windowSize?: Array<Object>;
}

export const WindowInstance = ({
  windowPosition = [],
  windowSize = [0.1, 1, 5.6625],
  ...props
}: Props) => {
  return (
    <group {...props}>
      <Instances>
        <boxGeometry args={windowSize as any} />
        <meshPhysicalMaterial color="#bee5fe" roughness={0.3} metalness={1}/>

        {windowPosition.map((position, idx) => (
          <Instance
            key={idx}
            position={[position.x, 0, position.z]}
            rotation={[0, Math.PI, 0]}/>
        ))}
      </Instances>
    </group>
  );
};
