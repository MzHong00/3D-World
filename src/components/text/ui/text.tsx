import { Center, Text3D, Float } from "@react-three/drei";

import Font3D from "shared/asset/font/Inter_Bold.json";

export const Text = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  return (
    <Center top position={[0, 1, 0]} rotation={[0.25, 0, 0]}>
      <Float floatIntensity={1} speed={0.7}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.1}
          height={0.2}
          lineHeight={0.7}
          letterSpacing={-0.06}
          font={Font3D as any}
        >
          {text}
          <meshStandardMaterial color={color} />
        </Text3D>
      </Float>
    </Center>
  );
};
