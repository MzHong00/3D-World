import { GroupProps } from "@react-three/fiber"
import { Clone, useAnimations, useFBX, useGLTF } from "@react-three/drei"

import { type SeatState } from "shared/types/type"
import personModel from 'shared/asset/3d/man.glb'
import sitAnimation from 'shared/asset/animations/Sitting.fbx'
import { useEffect } from "react"

interface Props extends GroupProps {
    seatPosition: SeatState[]
}

export const SeatedUserInstance = ({
    seatPosition,...props
}: Props) => {
    const { scene } = useGLTF(`${personModel}`);
    const { animations: sit } = useFBX(sitAnimation);

    const { actions: sitAction } = useAnimations(sit, scene);

    useEffect(() => {
        sitAction['mixamo.com']?.play();
    }, [sitAction])

    return (
        <group {...props}>
            {seatPosition.map((seat, idx) => (Math.floor((seat.seat.number - 1) % 20 / 10)) === 0 ?
                <Clone key={idx} object={scene} position={[-seat.x, 0, 1.4 - seat.z]} rotation={[0, Math.PI, 0]} />
                :
                <Clone key={idx} object={scene} position={[-seat.x, 0, 0.3 - seat.z]} />
            )}
        </group>
    )
}