import { GroupProps } from "@react-three/fiber"
import { Clone, useAnimations, useFBX, useGLTF } from "@react-three/drei"

import { Coordinate } from "shared/types/type"
import personModel from 'shared/asset/3d/man.glb'
import sitAnimation from 'shared/asset/animations/Sitting.fbx'
import { useEffect } from "react"

interface Props extends GroupProps {
    seatPosition: Coordinate[]
    numberOfSeat?: number
}

export const SeatedUserInstance = ({
    seatPosition, numberOfSeat = 0, ...props
}: Props) => {
    const { scene } = useGLTF(`${personModel}`);
    const { animations: sit } = useFBX(sitAnimation);

    const { actions: sitAction } = useAnimations(sit, scene);

    useEffect(() => {
        sitAction['mixamo.com']?.play();

    }, [sitAction])

    return (
        <group {...props}>
            {seatPosition.map((seat, idx) => (Math.floor(idx % 20 / 10)) === 0 ?
                <Clone key={idx} object={scene} position={[-seat.x, 0.1, 1.4 - seat.z]} rotation={[0, Math.PI, 0]} />
                :
                <Clone key={idx} object={scene} position={[-seat.x, 0.1, 0.3- seat.z]} />
            )}
        </group>
    )
}