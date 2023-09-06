'use client'

import { useRouter } from "next/navigation"
import Avatar from "../Avatar"
import { ScrollArea } from "../ui/scroll-area"
import Modal from "./Modal"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"

const OtherFriendModal = () => {

 const router = useRouter()

 const { onClose, isOpen, data } = useOtherFriendModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

 const { user, currentUser, friends, users } = data

 const navigateAndCloseModal = (userId: string) => {
  // Navigate to the user's profile
  router.push(`/profile/${userId}`);
  // Close the modal
  onClose();
};

  return (
    <Modal title="Friends"  isOpen={isOpen} onChange={onChange}>
      <ScrollArea>
        {/* FETCH USER FRINEDS */}
        {user?.friends.map((friend) => (
           <div key={friend.id}>
              {friend.userIds.map((userId) => {
                if (userId !== user.id) {
                const friendUser = users?.find((u) => u.id === userId);
                  return friendUser ? (
                   <div key={friendUser.id} className="p-4 w-full">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 cursor-pointer hover:font-medium transition" 
                      onClick={() => navigateAndCloseModal(friendUser.id)} >
                         <Avatar src={friendUser.image}/>
                          {friendUser.name}
                      </div>
                    </div>
                   </div>
                   ) : null;
                    }
                    return null;
                   })}
                 {currentUser && friend.userIds.includes(currentUser.id) && (
                 <div key={currentUser.id} className="p-4 w-full">
                    <div className="flex items-center gap-4">
                     <div className="flex items-center gap-4 cursor-pointer hover:font-medium transition"
                     onClick={() => navigateAndCloseModal(currentUser.id)} >
                        <Avatar src={currentUser.image}/>
                        {currentUser.name}
                     </div>
                   </div>
                  </div>
                     )}
                 </div>
                 ))}
      </ScrollArea>
    </Modal>
  )
}

export default OtherFriendModal