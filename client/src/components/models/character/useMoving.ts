import * as THREE from "three"
import { Controls } from './useKeyControls';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useState } from "react";

const SPEED = 3
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export const useMoving = (ref: any) => {
    const [, get] = useKeyboardControls<Controls>()
    const [isMoving, setIsMoving] = useState<boolean>(false);

    useFrame((state) => {
        const { up, down, left, right } = get()
        setIsMoving(up || down || left || right);

        const velocity = ref.current?.linvel()
        
        //camera
        // const { x, y, z } = ref.current.translation();
        // state.camera.position.set(x, y + 10, z + 10);
        // state.camera.lookAt(x, y, z)

        // movement
        frontVector.set(0, 0, boolToNum(down) - boolToNum(up))
        sideVector.set(boolToNum(left) - boolToNum(right), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)

        // rotation
        if (direction.x || direction.z) {
            const degree = calcRotation(direction.x, direction.z);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * degree);
            ref.current.setRotation(quaternion, true);
        }
        
    })

    return {
        isMoving: isMoving
    }
}

const boolToNum = (bool: boolean): number => {
    return bool ? 1 : 0;
}

const calcRotation = (x: number, z: number): number => {
    const isVertical = x * z === 0 ? true : false;
    if (isVertical) {
        if (x === 0) {
            return z > 0 ? 0 : 1
        } else {
            return x > 0 ? 0.5 : -0.5
        }
    } else {
        if (x > 0) {
            return z > 0 ? 0.25 : 0.75
        } else {
            return z > 0 ? -0.25 : -0.75
        }
    }
}