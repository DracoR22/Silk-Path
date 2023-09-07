import { Comment, Like, Post, User } from '@prisma/client'
import { create } from 'zustand'

interface DeletePostModalData {
    post?: Post & { user: User } & { likes: Like[] } & { comments: Comment[]} | null
    currentUser?: User | null
}

interface DeletePostModalStore {
    isOpen: boolean
    onOpen: (data?: DeletePostModalData) => void
    onClose: () => void
    data: DeletePostModalData
}

const useDeletePostModal = create<DeletePostModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useDeletePostModal