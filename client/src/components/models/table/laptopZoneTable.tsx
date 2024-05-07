import { Instance, Instances } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { organizeTablePos } from "components/virtualWorld/laptop/position/useTablePosition"
import { useRef } from "react"
import { Coordinate } from "shared/types/type"

export const LaptopZoneTable = (props: GroupProps) => {
    const width = useRef<number>(6);
    const height = useRef<number>(3);

    const tablePosition = organizeTablePos(width.current, height.current)

    return (
        <group {...props}>
            <SmallTableInstance position={tablePosition.smallTable} />
            <BigTableInstance position={tablePosition.bigTable} />
        </group>
    )
}

const SmallTableInstance = ({
    position
}: {
    position: Coordinate[]
}) => {

    return (
        <>
            <Instances>
                <boxGeometry args={[6, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3, 1, -position.z* 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3 - 3 + 0.05, 0.5, -1.5 + 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3 - 3 + 0.05, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, -1.5 + 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-3 + 0.05 - position.x * 0.3, 0.08, 0 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.08, 0 - position.z * 0.6]} />)}
            </Instances>
        </>
    )
}

const BigTableInstance = ({
    position
}: {
    position: Coordinate[]
}) => {

    return (
        <>
            <Instances>
                <boxGeometry args={[8, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3 - 1, 1, -position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3 - 5 + 0.05, 0.5, -1.5 + 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-position.x * 0.3 - 5 + 0.05, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, 1.5 - 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.5, -1.5 + 0.05 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[-5 + 0.05 - position.x * 0.3, 0.08, 0 - position.z * 0.6]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {position.map((position, idx) => <Instance key={idx} position={[3 - 0.05 - position.x * 0.3, 0.08, 0 - position.z * 0.6]} />)}
            </Instances>
        </>
    )
}