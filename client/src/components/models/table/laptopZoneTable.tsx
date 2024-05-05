import { Box, ContactShadows, Instance, Instances } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { useRef } from "react"
import { SeatStateDto } from "shared/types/type"

interface Props {
    numberOfTable: number
    data: SeatStateDto[]
    props: GroupProps
}

export const LaptopZoneTable = ({
    numberOfTable = 1, data = [], ...props
}: Partial<Props>) => {
    const width = useRef<number>(6);
    const height = useRef<number>(3);
    console.log(data);
    
    return (
        <group {...props}>
            <Instances>
                <boxGeometry args={[6, 0.1, 3]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[0, 1, 0]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[-3 + 0.05, 0.5, -1.5 + 0.05]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[-3 + 0.05, 0.5, 1.5 - 0.05]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[3 - 0.05, 0.5, 1.5 - 0.05]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[3 - 0.05, 0.5, -1.5 + 0.05]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[-3 + 0.05, 0.08, 0]} />)}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, 3]} />
                <meshStandardMaterial />
                {Array.from({ length: numberOfTable }).map((v, i) => <Instance position={[3 - 0.05, 0.08, 0]} />)}
            </Instances>
            <ContactShadows scale={7} blur={3} opacity={0.25} far={2} frames={1} />
        </group>
    )
}