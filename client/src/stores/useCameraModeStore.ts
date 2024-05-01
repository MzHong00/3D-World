import { create } from "zustand"

interface AvatarState {
    modeState: boolean
    setModeState: (mode: boolean) => void
}
export const useCameraModeStore = create<AvatarState>()((set) => ({
    modeState: true,
    setModeState: (mode) => set(() => ({ modeState: mode })),
}))