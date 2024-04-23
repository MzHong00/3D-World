import { create } from 'zustand'

import DefaultAvatar from 'shared/asset/3d/person.glb'
import { type ReactNode, type MouseEvent } from 'react'

interface AvatarState {
    avatar: string | undefined
    setAvatar: (avatarUrl: string) => void
}
export const useAvatarStore = create<AvatarState>()((set) => ({
    avatar: DefaultAvatar,
    setAvatar: (avatarUrl) => set(() => ({ avatar: avatarUrl })),
}))

interface DialogState {
    dialog: ReactNode | undefined
    isOpen: boolean
    setDialog: (dialogComponent: ReactNode) => void
    clickOpenButton: () => void,
    closeButton: (e: any) => void,
    clickBackdrop: (e: MouseEvent<HTMLElement>) => void

}
export const useDialogStore = create<DialogState>()((set) => ({
    dialog: undefined,
    isOpen: false,
    setDialog: (dialogComponent) => set(() => ({
        dialog: dialogComponent
    })),
    clickOpenButton: () => set(() => ({
        isOpen: true
    })),
    closeButton: (e) => set(() => {
        e.stopPropagation()
        return { isOpen: false }
    }),
    clickBackdrop: (e: MouseEvent<HTMLElement>) => set(() => {
        return e.target === e.currentTarget ? { isOpen: false } : { isOpen: true }
    }),
}))