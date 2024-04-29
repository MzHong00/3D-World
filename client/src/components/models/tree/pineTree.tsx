import { useGLTF } from "@react-three/drei";

import TreeGLB from 'shared/asset/3d/pine_tree.glb'

export const PineTree = (props: any) => {
    
    const { scene } = useGLTF(`${TreeGLB}`);

    return (
        <primitive object={scene} {...props}/>
    )
}