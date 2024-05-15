import * as THREE from 'three';
import { MeshProps } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import AsphaltTexture from 'shared/asset/image/asphalt.jpg'

interface Props extends MeshProps {
    args: any
}

export const ZoneFloor = ({
    args, ...props
}: Props) => {
    const asphalt = useTexture(`${AsphaltTexture}`);
    asphalt.repeat.set(10, 10);
    asphalt.wrapS = asphalt.wrapT = THREE.RepeatWrapping;

    return (
            <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
                <planeGeometry args={args} />
                <meshStandardMaterial map={asphalt} wireframe/>
            </mesh>
    )
}