import { type GroupProps } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { PillarInstance } from "./pillarInstance"
import { useLayoutEffect, useState } from "react"
import { Coordinate } from "shared/types/type"
import { WindowInstance } from "./windowInstance"

export const SideWall = (props: GroupProps) => {
    const [pillarPosition, setPillarPosition] = useState<Coordinate[]>([]);
    const [windowPosition, setWindowPosition] = useState<Coordinate[]>([]);

    useLayoutEffect(() => {
        const initPillarPosition = () => {
            const numberOfPillar = 9;
            const hallZSize = 100;

            const position: Coordinate[] = Array.from({ length: numberOfPillar }).map((_, i) => {
                return {
                    x: 0,
                    z: i * ((hallZSize - 1) / (numberOfPillar - 1)) - 49.5
                }
            });

            setPillarPosition(position);
        }

        const initWindowPosition = () => {
            const numberOfWindow = 16;
            const windowWidth = 5.6625;
            const sliceGroup = 2;

            const position: Coordinate[] = Array.from({ length: numberOfWindow }).map((_, i) => {
                const space = Math.floor(i / sliceGroup) * 1.05;
                const thinSpace = i % sliceGroup === 0 ? -0.05 : 0
                return {
                    x: 0,
                    z: i * windowWidth + space - 46.1 + thinSpace
                }
            });

            setWindowPosition(position);
        }

        initPillarPosition();
        initWindowPosition();
    }, []);

    return (
        <group {...props}>
            <RigidBody type="fixed">
                <mesh>
                    <boxGeometry args={[1, 1, 100]} />
                    <meshStandardMaterial />
                </mesh>
            </RigidBody>
            <PillarInstance pillarPosition={pillarPosition} />
            <WindowInstance position={[-0.5, 0.95, 0]} windowPosition={windowPosition} />
            <WindowInstance position={[-0.5, 2, 0]} windowPosition={windowPosition} />
        </group>
    )
}