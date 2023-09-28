import { FullPostType, FullRequestType } from '@/types'
import { Like, Post, Request, User } from '@prisma/client'
import { create } from 'zustand'

interface LikedPostModalData {
    post?: Post & { user: User } & { likes: (Like & { user: User })[] } 
    currentUser?: User | null
    likes?: Like[]
    requests?: any
    friends?: any
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