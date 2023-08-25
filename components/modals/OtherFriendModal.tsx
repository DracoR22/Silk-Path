'use client'

import Modal from "./Modal"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"

const OtherFriendModal = () => {

 const { onClose, isOpen } = useOtherFriendModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Friends"  isOpen={isOpen} onChange={onChange}>
      <p className="text-neutral-400">User Friends are private</p>
    </Modal>
  )
}

export default OtherFriendModal