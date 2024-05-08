import { useRef } from "react"
import { GroupProps } from "@react-three/fiber"
import { Instance, Instances, useGLTF } from "@react-three/drei"

import chairGlb from 'shared/asset/3d/chair.glb'
import { organizeSeatPos } from "components/virtualWorld/laptop/position/organizedSeatPosition"

interface Props extends GroupProps {
    numberOfSeat: number
}

export const LaptopZoneChair = ({
    numberOfSeat, ...props
}: Props) => {
    const width = useRef<number>(6);
    const { nodes, materials }: any = useGLTF(`${chairGlb}`);

    const seatPosition = organizeSeatPos(numberOfSeat, width.current)

    return (
        <group {...props}>
            <Instances geometry={nodes.office_chair_Material_0.geometry} material={materials.Material} scale={1.5}>
                {seatPosition.map((seat, idx) => {
                    if (idx >= 200) return

                    return (Math.floor(idx % 20 / 10)) === 0 ?
                        <Instance position={[-seat.x * 0.2 + 0.15, 0, 1 - seat.z * 0.2]} rotation={[Math.PI * 1.5, 0, 0]} />
                        :
                        <Instance position={[-seat.x * 0.2 + 0.15, 0, - seat.z * 0.2]} rotation={[Math.PI * 1.5, 0, Math.PI]} />
                })}
            </Instances>
        </group>
    )
}