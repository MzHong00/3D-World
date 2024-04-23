import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

import EntryFloorTexture from 'shared/asset/image/entryFloor.png'

export const EntryFloor = (props: any) => {
    const asphalt = useTexture(`${EntryFloorTexture}`);
    asphalt.repeat.set(8, 20);
    asphalt.wrapS = asphalt.wrapT = THREE.RepeatWrapping;

    return (
        <RigidBody {...props}
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject?.name === "character") {
                    other.rigidBody?.setTranslation({ x: other.rigidBodyObject?.position.x, y: 1.501, z: other.rigidBodyObject?.position.z }, true)
                }
            }}
        >
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
                <boxGeometry args={[20, 50, 1]} />
                <meshStandardMaterial map={asphalt} />
            </mesh>
        </RigidBody>
    )
}