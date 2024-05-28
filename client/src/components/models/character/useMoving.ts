import { useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RapierRigidBody } from "@react-three/rapier";

import { Controls } from "./useKeyControls";
import { useCameraModeStore } from "stores/useCameraModeStore";
import { useCharacterPos } from "stores/useCharacterPos";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const useMoving = (ref: React.RefObject<RapierRigidBody>) => {
  const [, get] = useKeyboardControls<Controls>();
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const { setPosition } = useCharacterPos();
  const { modeState } = useCameraModeStore((state) => state);
  const SPEED = 6;

  useFrame((state) => {
    const { up, down, left, right } = get();
    setIsMoving(up || down || left || right);

    if (!ref.current) return;
    const { x, y, z } = ref.current!.translation();
    const velocity = ref.current?.linvel();

    if (y < -0.5) ref.current.setTranslation({ x: 0, y: 2, z: 0 }, true);

    if (modeState) {
      //camera
      state.camera.rotation.set(-0.7853981633974484, 0, 0);
      state.camera.position.set(x, 10, z + 10);
      if (!isMoving) return;

      // movement
      frontVector.set(0, 0, boolToNum(down) - boolToNum(up));
      sideVector.set(boolToNum(left) - boolToNum(right), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED);
      ref.current?.setLinvel(
        { x: direction.x, y: velocity!.y, z: direction.z },
        true
      );

      // rotation
      if (direction.x || direction.z) {
        const degree = calcRotation(direction.x, direction.z);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          Math.PI * degree
        );
        ref.current?.setRotation(quaternion, true);
      }
    } else {
      state.camera.position.set(x, y + 1, z);
      if (!isMoving) return;

      // movement
      frontVector.set(0, 0, boolToNum(down) - boolToNum(up));
      sideVector.set(boolToNum(left) - boolToNum(right), 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);
      ref.current?.setLinvel(
        { x: direction.x, y: velocity!.y, z: direction.z },
        true
      );
    }

    setPosition({ x: x, z: z });
  });

  return {
    isMoving: isMoving,
  };
};

const boolToNum = (bool: boolean): number => {
  return bool ? 1 : 0;
};

const calcRotation = (x: number, z: number): number => {
  const isVertical = x * z === 0 ? true : false;
  if (isVertical) {
    if (x === 0) {
      return z > 0 ? 0 : 1;
    } else {
      return x > 0 ? 0.5 : -0.5;
    }
  } else {
    if (x > 0) {
      return z > 0 ? 0.25 : 0.75;
    } else {
      return z > 0 ? -0.25 : -0.75;
    }
  }
};
