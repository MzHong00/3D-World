import { useRef } from "react"
import { type GroupProps } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"

import { Coordinate } from "shared/types/type"

interface Props extends GroupProps {
    pillarPosition: Coordinate[]
}

export const PillarInstance = ({
    pillarPosition = [], ...props
}: Props) => {
    const width = useRef<number>(1);
    const height = useRef<number>(2);

    return (
        <group {...props}>
            <Instances>
                <boxGeometry args={[width.current, height.current, width.current]} />
                <meshStandardMaterial  />

                {pillarPosition.map((position, idx) => <Instance key={idx} position={[position.x, 1.5, position.z]} />)}
            </Instances>
        </group>
    )
}