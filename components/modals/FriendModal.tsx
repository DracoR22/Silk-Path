'use client'

import Modal from "./Modal"
import useFriendModal from "@/hooks/useFriendModal"
import FriendList from "../FriendList"
import { FullFriendType } from "@/types"
import { User } from "@prisma/client"

interface Props {
  friends: FullFriendType[]
}

const FriendModal = ({friends}: Props) => {

 const { onClose, isOpen } = useFriendModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Friends" isOpen={isOpen} onChange={onChange}>
     {friends.length > 0 && friends.map((friend) => (
       <FriendList key={friend.id} friend={friend}/>
        ))}

        {friends.length === 0 && (
          <p className="text-sm text-neutral-400">
            You have no friends yet.
          </p>
        )}
    </Modal>
  )
}

export default FriendModal