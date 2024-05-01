import { create } from 'zustand'
import { type ReactNode, type MouseEvent } from 'react'

interface DialogState {
    dialog: ReactNode | undefined
    isOpen: boolean
    setDialog: (dialogComponent: ReactNode) => void
    setDialogOpen: () => void,
    setDialogClose: (e: any) => void,
    setDialogBackdrop: (e: MouseEvent<HTMLElement>) => void

}
export const useDialogStore = create<DialogState>()((set) => ({
    dialog: undefined,
    isOpen: false,
    setDialog: (dialogComponent) => set(() => ({
        dialog: dialogComponent
    })),
    setDialogOpen: () => set(() => ({
        isOpen: true
    })),
    setDialogClose: (e) => set(() => {
        e.stopPropagation()
        return { isOpen: false }
    }),
    setDialogBackdrop: (e: MouseEvent<HTMLElement>) => set(() => {
        return e.target === e.currentTarget ? { isOpen: false } : { isOpen: true }
    }),
}))