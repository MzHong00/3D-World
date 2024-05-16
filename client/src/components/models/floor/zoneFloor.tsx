import * as THREE from 'three';
import { MeshProps } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import ZoneFloorTexture from 'shared/asset/image/zoneFloor.png'

interface Props extends MeshProps {
    args: any
}

export const ZoneFloor = ({
    args, ...props
}: Props) => {
    const zone = useTexture(`${ZoneFloorTexture}`);
    zone.repeat.set(30, 50);
    zone.wrapS = zone.wrapT = THREE.RepeatWrapping;

    return (
            <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
                <planeGeometry args={args} />
                <meshStandardMaterial map={zone}/>
            </mesh>
    )
}