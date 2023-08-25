'use client'

import Modal from "./Modal"
import FriendList from "../FriendList"
import { FullFriendType } from "@/types"
import { User } from "@prisma/client"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"

interface Props {
  friends: FullFriendType[]
  users: User[]
}

const OtherFriendModal = ({friends, users}: Props) => {

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