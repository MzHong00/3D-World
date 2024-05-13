import { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';

import { useAvatarStore } from 'stores/useAvatarStore';
import { useMoving } from './useMoving';

import StandingFBX from 'shared/asset/animations/Standing.fbx'
import WalkingFBX from 'shared/asset/animations/Walking.fbx'
import { useCameraModeStore } from 'stores/useCameraModeStore';

export const Player = () => {
  const player = useRef<RapierRigidBody>(null);
  const avatar = useAvatarStore((state) => state.avatar);

  const { scene } = useGLTF(`${avatar}`);
  const { animations: standing } = useFBX(StandingFBX);
  const { animations: walking } = useFBX(WalkingFBX);
  const { actions: standingAction } = useAnimations(standing, scene);
  const { actions: walkingAction } = useAnimations(walking, scene);

  const { isMoving } = useMoving(player);
  const { modeState } = useCameraModeStore(state => state)

  useEffect(() => {
    const standingAnimation = standingAction['mixamo.com'];
    const walkingAnimation = walkingAction['mixamo.com'];
    if (isMoving) {
      walkingAnimation?.play();
    } else {
      walkingAnimation?.stop();
      standingAnimation?.play();
    }
  }, [standingAction, walkingAction, isMoving])

  return (
    <RigidBody
      ref={player}
      position={[0, 2, 0]}
      mass={1}
      colliders={false}
      lockRotations >
      <CuboidCollider args={[0.3, 1, 0.3]} >
        <primitive visible={modeState && 'invisible'} object={scene} position={[0, -1, 0]} />
      </CuboidCollider>
    </RigidBody>
  )
}