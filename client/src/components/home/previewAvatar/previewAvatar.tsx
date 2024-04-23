import { useEffect } from "react"
import StandingFBX from 'shared/asset/animations/Standing.fbx'
import { useAvatarStore } from "stores/useStore"

import { Sky, useAnimations, useFBX, useGLTF } from "@react-three/drei"

export const PreviewAvatar = () => {
    const avatar = useAvatarStore((state) => state.avatar);
    const { scene } = useGLTF(`${avatar}`);
    const { animations: standing } = useFBX(StandingFBX);
    const { actions: standingAction } = useAnimations(standing, scene);
    useEffect(() => {
        const standingAnimation = standingAction['mixamo.com'];
        standingAnimation?.play();

    }, [standingAction])
    return (
        <group>
            <ambientLight intensity={2} />
            <Sky />
            <primitive object={scene} position={[0, -1, 0]} />
        </group>
    )
}