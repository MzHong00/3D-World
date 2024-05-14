import { Instance, Instances } from "@react-three/drei"

import { Coordinate } from "shared/types/type"

interface Props {
    position: Coordinate[]
    adjustXSize: number
    adjustZSize: number
}
export const TableInstance = ({
    position, adjustXSize, adjustZSize
}: Props) => {

    return (
        <>
            <Instances>
                <boxGeometry args={[adjustXSize, 0.1, adjustZSize]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [-position.x * 0.3 - (adjustXSize - 6) / 2,
                                    1,
                                -0.15 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>

            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [(3 - adjustXSize) - position.x * 0.3 + 0.05,
                                    0.5,
                                -(0.15 + adjustZSize / 2) + 0.05 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [(3 - adjustXSize) - position.x * 0.3 + 0.05,
                                    0.5,
                                (adjustZSize / 2 - 0.15) - 0.05 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [3 - 0.05 - position.x * 0.3,
                                    0.5,
                                    (adjustZSize / 2 - 0.15) - 0.05 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [3 - 0.05 - position.x * 0.3,
                                    0.5,
                                    -(0.15 + adjustZSize / 2) + 0.05 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>

            <Instances>
                <boxGeometry args={[0.1, 0.1, adjustZSize]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [(3 - adjustXSize) + 0.05 - position.x * 0.3,
                                    0.08,
                                -0.15 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>
            <Instances>
                <boxGeometry args={[0.1, 0.1, adjustZSize]} />
                <meshStandardMaterial wireframe />
                {position.map(
                    (position, idx) => (
                        <Instance
                            key={idx}
                            position={
                                [3 - 0.05 - position.x * 0.3,
                                    0.08,
                                -0.15 - position.z * 0.6]
                            } />
                    )
                )}
            </Instances>
        </>
    )
}