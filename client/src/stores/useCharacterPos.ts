import { Coordinate } from 'shared/types/type'
import { create } from 'zustand'

interface PositionState {
    position: Coordinate
    setPosition: (charPos: Coordinate) => void
}

export const useCharacterPos = create<PositionState>()((set) => ({
    position: { x: 0, z: 0 },
    setPosition: (charPos) => set(() => ({ position: charPos })),
}))
