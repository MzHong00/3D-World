import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import AsphaltTexture from 'shared/asset/image/asphalt.jpg'
import { MeshProps } from '@react-three/fiber';

export const Asphalt = (props: MeshProps) => {
    const asphalt = useTexture(`${AsphaltTexture}`);
    asphalt.repeat.set(10, 10);
    asphalt.wrapS = asphalt.wrapT = THREE.RepeatWrapping;

    return (
            <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
                <planeGeometry args={[42, 100]} />
                <meshStandardMaterial map={asphalt} wireframe/>
            </mesh>
    )
}