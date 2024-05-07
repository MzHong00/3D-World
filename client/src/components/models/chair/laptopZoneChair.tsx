import { useRef } from "react"
import { GroupProps } from "@react-three/fiber"
import { Instance, Instances, useGLTF } from "@react-three/drei"
import { organizeSeatPos } from "components/virtualWorld/laptop/position/useSeatPosition"
import { SeatStateDto } from "shared/types/type"

import chairGlb from 'shared/asset/3d/chair.glb'

interface Props extends GroupProps {
    data: SeatStateDto[]
}

export const LaptopZoneChair = ({
    data = [], ...props
}: Props) => {
    const width = useRef<number>(6);

    const { nodes, materials }: any = useGLTF(`${chairGlb}`);

    const seatPosition = organizeSeatPos(data, width.current)
    
    return (
        <group {...props}>
            <Instances geometry={nodes.Object_3.geometry} material={materials.Material} scale={0.15} >
                {seatPosition.map((seat) => <Instance position={[-seat.x * 2, 0, -seat.z * 2]} />)}
            </Instances>
        </group>
    )
}