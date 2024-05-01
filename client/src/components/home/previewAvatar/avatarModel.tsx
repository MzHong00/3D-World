
import { useEffect } from "react"
import StandingFBX from 'shared/asset/animations/Standing.fbx'
import { useAvatarStore } from "stores/useAvatarStore"

import { OrbitControls, Shadow, useAnimations, useFBX, useGLTF } from "@react-three/drei"

export const AvatarModel = () => {
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
            <ambientLight intensity={1.5} />
            <directionalLight intensity={1} />
            <OrbitControls
                enableZoom={false}
                minPolarAngle={1.3} maxPolarAngle={1.4} />
            <primitive object={scene} position={[0, -1, 0]}>
                <Shadow
                    position={[0.1, 0, 0.05]}
                    scale={0.7}
                    color="black"
                    opacity={0.3}
                    fog={true} // Reacts to fog (default=false)
                />
            </primitive>
        </group>
    )
}
