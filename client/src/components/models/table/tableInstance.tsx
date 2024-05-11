import { Instance, Instances } from "@react-three/drei"
import { Coordinate } from "shared/types/type"

interface Props {
    position: Coordinate[]
    headCount: number
}
export const TableInstance = ({
    position, headCount
}: Props) => {

    return (
        <>
            <Instances>
                <boxGeometry args={[headCount, 0.1, 3.3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3-(headCount-6)/2, 1, -0.15 - position.z * 0.6]} />)}
            </Instances>

            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[(3 - headCount) - position.x * 0.3 + 0.05, 0.5, -1.8 + 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[(3 - headCount) - position.x * 0.3 + 0.05, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, -1.8 + 0.05 - position.z * 0.6]} />)}
            </Instances>

            <Instances>
                <boxGeometry args={[0.1, 0.1, 3.3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[(3 - headCount) + 0.05 - position.x * 0.3, 0.08, -0.15 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3.3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.08, -0.15 - position.z * 0.6]} />)}
            </Instances>
        </>
    )
}