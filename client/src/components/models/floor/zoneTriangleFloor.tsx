import { useMemo } from "react";
import * as THREE from "three";
import { Instance, Instances, useTexture } from "@react-three/drei";

import { TriangleGeometry } from "shared/ui/BufferGeometry/triangleGeometry";
import ZoneFloorTexture from "shared/asset/image/zoneTirangleFloor.png";

export const ZoneTriangleFloor = () => {
    const texture = useTexture(`${ZoneFloorTexture}`);

    texture.repeat.set(4, 4);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    const vertices = useMemo(() => {
        return [
            new THREE.Vector3(0, 5.05, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5.05, 0, 0)
        ];
    }, [])

    const position = useMemo(() => {
        return [
            [-13, 0, 25.05],
            [4.05, 0, 25.05],
            [4.05, 0, -25.05],
            [-13, 0, -25.05]
        ];
    }, [])
    const geometry = TriangleGeometry(vertices);

    return (
        <Instances geometry={geometry}>

            <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
            {position.map((pos, idx) => <Instance rotation={[Math.PI * 1.5, 0, Math.PI * (0.5 * idx)]} position={pos as any} />)}
        </Instances>
    )
}