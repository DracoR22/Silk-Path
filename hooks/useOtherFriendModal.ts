import { create } from 'zustand'

interface OtherFriendModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useOtherFriendModal = create<OtherFriendModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useOtherFriendModal