'use client'

import useSettingsModal from "@/hooks/useSettingsModal"
import Modal from "./Modal"
import { signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

const SettingsModal = () => {

 const { onClose, isOpen } = useSettingsModal()
 const router = useRouter()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Settings"  isOpen={isOpen} onChange={onChange}>
      <div className="flex w-full items-center justify-center">
        <p className="border-b border-t p-3 border-neutral-800 w-full flex items-center justify-center
        cursor-pointer hover:bg-neutral-900 transition" onClick={() => signOut({callbackUrl: '/'})}>
           Log Out
        </p>
      </div>
    </Modal>
  )
}

export default SettingsModal