import { FullFriendType, FullRequestType } from '@/types'
import { Friend, User } from '@prisma/client'
import { create } from 'zustand'

interface OtherFriendModalData {
    user?: User & { friends: Friend[] } | null
    currentUser?: User | null
    friends?: any
    users?: User[]
    requests?: any
}

interface OtherFriendModalStore {
    isOpen: boolean
    onOpen: (data?: OtherFriendModalData) => void
    onClose: () => void
    data: OtherFriendModalData
}

const useOtherFriendModal = create<OtherFriendModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useOtherFriendModal