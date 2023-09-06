import { User } from '@prisma/client'
import { create } from 'zustand'

interface EditUserModalData {
    user?: User | null
}

interface EditUserModalStore {
    isOpen: boolean
    onOpen: (data?: EditUserModalData) => void
    onClose: () => void
    data: EditUserModalData
}

const useEditUserModal = create<EditUserModalStore>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data = {}) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}))

export default useEditUserModal