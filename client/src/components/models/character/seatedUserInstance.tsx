import { GroupProps } from "@react-three/fiber"
import { Instance, Instances, useGLTF } from "@react-three/drei"

import personGlb from 'shared/asset/3d/person.glb'
import { Coordinate } from "shared/types/type"

interface Props extends GroupProps {
    seatPosition: Coordinate[]
    numberOfSeat?: number
}

export const SeatedUserInstance = ({
    seatPosition, numberOfSeat = 0, ...props
}: Props) => {
    const { scene }: any = useGLTF(`${personGlb}`);
    
    return (
        <group {...props}>
            <Instances>
                <primitive object={scene}></primitive>
                     <Instance />
            </Instances>
        </group>
    )
}