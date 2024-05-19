import { RigidBody } from "@react-three/rapier";

export const LaidPillar = () => {
  return (
    <>
      <RigidBody type="fixed">
        <mesh>
          <boxGeometry args={[1, 1, 66]} />
          <meshStandardMaterial
            color="#6e6e6e"
            emissive="#6e6e6e"
            metalness={1}
          />
        </mesh>
      </RigidBody>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 66]} />
        <meshStandardMaterial
          color="#6e6e6e"
          emissive="#6e6e6e"
          metalness={1}
        />
      </mesh>
    </>
  );
};
