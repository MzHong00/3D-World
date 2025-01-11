import { OrbitControls, Shadow } from "@react-three/drei";
import { useStandAnimation } from "../model/useStandAnimation";

export const AvatarModel = () => {
  const { avatarObject } = useStandAnimation();

  return (
    <group>
      <ambientLight intensity={1.5} />
      <directionalLight intensity={1} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={1.3}
        maxPolarAngle={1.4}
      />
      <primitive object={avatarObject} position={[0, -1, 0]}>
        <Shadow
          position={[0.1, 0, 0.05]}
          scale={0.7}
          color="black"
          opacity={0.3}
          fog={true}
        />
      </primitive>
    </group>
  );
};
