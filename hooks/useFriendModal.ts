import { create } from 'zustand'

interface FriendModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useFriendModal = create<FriendModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useFriendModal