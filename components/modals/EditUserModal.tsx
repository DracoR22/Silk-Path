'use client'

import useEditUserModal from "@/hooks/useEditUserModal"
import Modal from "./Modal"
import EditUserForm from "../forms/EditUserForm"

const EditUserModal = () => {

 const { onClose, isOpen, data } = useEditUserModal()
 const { user } = data

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Edit your profile" isOpen={isOpen} onChange={onChange}>
      <EditUserForm user={user}/>
    </Modal>
  )
}

export default EditUserModal