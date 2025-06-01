import { useGLTF } from "@react-three/drei";
import { type GroupProps } from "@react-three/fiber";

import PlantGlb from "shared/asset/3d/plant.glb";

export const Plant = (props: GroupProps) => {
  const { scene }: any = useGLTF(`${PlantGlb}`);
  
  return (
    <group {...props}>
      <primitive object={scene}  />
    </group>
  )
};
