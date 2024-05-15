import { Instance, Instances } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { PillarInstance } from "./pillarInstance"
import { WindowInstance } from "./windowInstance"
import { useEffect, useLayoutEffect, useState } from "react"
import { Coordinate } from "shared/types/type"


export const CenterWall = (props: GroupProps) => {
    const [smallWindowPosition, setSmallWindowPosition] = useState<Coordinate[]>([]);
    const [bigWindowPosition, setBigWindowPosition] = useState<Coordinate[]>([]);
    const [pillarPosition, setPillarPosition] = useState<Coordinate[]>([]);
    useLayoutEffect(() => {
        const initWindow = () => {
            const numberOfWindow = 6
            const smallXGap = 26, smallZGap = 52
            const bigXGap = 26, bigZGap = 13

            const smallWindowPosition: Coordinate[] = Array.from({ length: numberOfWindow }).map((_, i) => {
                return {
                    x: Math.floor(i / 3) * smallXGap,
                    z: i % (numberOfWindow / 2) * smallZGap
                }
            console.log(bigWindowPosition);

            })

            const bigWindowPosition: Coordinate[] = Array.from({ length: numberOfWindow }).map((_, i) => {
                return {
                    x: Math.floor(i / 3) * bigXGap - 13,
                    z: i % (numberOfWindow / 2) * bigZGap - 13
                }
            })
            setSmallWindowPosition(smallWindowPosition)
            setBigWindowPosition(bigWindowPosition);
        }

        const initPillar = () => {
            const numberOfPillar = 8
            const xGap = 26, zGap = 13

            const position: Coordinate[] = Array.from({ length: numberOfPillar }).map((_, i) => {
                return {
                    x: Math.floor(i / (numberOfPillar / 2)) * xGap - 13,
                    z: i % (numberOfPillar / 2) * zGap - 19.5
                }
            })

            setPillarPosition(position)
        }

        initPillar();
        initWindow();
    }, []);

    return (
        <group {...props}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[26, 52]} />
                <meshStandardMaterial />
            </mesh>
            <PillarInstance pillarPosition={pillarPosition} />
            <WindowInstance position={[0, 1.5, 0]} rotation={[0, 0, Math.PI]} windowPosition={smallWindowPosition} glassSize={[0.1, 2, 12]} />
            <WindowInstance position={[0, 1.5, 0]} rotation={[0, 0, Math.PI]} windowPosition={bigWindowPosition} glassSize={[0.1, 2, 12]} />
        </group>
    )
}