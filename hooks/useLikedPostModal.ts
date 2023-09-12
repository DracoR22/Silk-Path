import { FullPostType } from '@/types'
import { User } from '@prisma/client'
import { create } from 'zustand'

interface LikedPostModalData {
    post?: FullPostType
    currentUser?: User | null
}

interface LikedPostModalStore {
    isOpen: boolean
    onOpen: (data?: LikedPostModalData) => void
    onClose: () => void
    data: LikedPostModalData
}

const useLikedPostModal = create<LikedPostModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useLikedPostModal