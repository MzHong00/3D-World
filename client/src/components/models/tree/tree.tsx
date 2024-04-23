import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

import TreeGLB from 'shared/asset/3d/tree_wind_system.glb'

export const Tree = () => {
    
    // const { scene, animations } = useGLTF(TreeGLB as string);
    // const { actions: windAction } = useAnimations(animations, scene);

    // useEffect(() => {
    //     const windAnimation = windAction['Armature|Armature|ArmatureAction'];
    //     windAnimation?.setEffectiveTimeScale(0.1)
    //     windAnimation?.play();
    // }, [])

    // return (
    //     <primitive object={scene}/>
    // )
}