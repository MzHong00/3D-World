import { Instance, Instances } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { Coordinate } from "shared/types/type"

interface Props extends GroupProps{
    windowPosition: Coordinate[]
    glassSize?: Array<Object>
}

export const WindowInstance = ({
    windowPosition = [], glassSize = [0.1, 1,5.6625], ...props
}: Props) => {

    return (
        <group {...props}>
            <Instances>
            <boxGeometry args={glassSize as any} />
            <meshPhysicalMaterial roughness={0.1} metalness={0.1} transmission={0.8} thickness={0} />
            {windowPosition.map((position) => (
                <Instance position={[position.x, 0, position.z]} rotation={[0, Math.PI, 0]} />
            ))}
        </Instances>
        </group>
    )
}