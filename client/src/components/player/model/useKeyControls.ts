import { useMemo } from "react"
import { KeyboardControlsEntry } from "@react-three/drei";

export enum Controls {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
  // jump = 'jump',
}

export function useKeyControls() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.up, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.down, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    // { name: Controls.jump, keys: ['Space'] },
  ], [])

  return map;
}
