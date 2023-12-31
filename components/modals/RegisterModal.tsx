'use client'

import Modal from "./Modal"
import useRegisterModal from "@/hooks/useRegisterModal"
import RegisterForm from "../forms/RegisterForm"

const RegisterModal = () => {

 const { onClose, isOpen } = useRegisterModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal description="Create you Silk Path account for free" isOpen={isOpen} onChange={onChange}>
      <RegisterForm/>
    </Modal>
  )
}

export default RegisterModal
