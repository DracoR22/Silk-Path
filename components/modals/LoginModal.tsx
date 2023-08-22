'use client'

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import useLoginModal from "@/hooks/useLoginModal"
import LoginForm from "../forms/LoginForm"

const LoginModal = () => {

 const router = useRouter()
 const { onClose, isOpen } = useLoginModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Welcome Back!" isOpen={isOpen} onChange={onChange}>
      <LoginForm/>
    </Modal>
  )
}

export default LoginModal