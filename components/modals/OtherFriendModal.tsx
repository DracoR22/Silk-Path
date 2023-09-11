'use client'

import { useRouter } from "next/navigation"
import Avatar from "../Avatar"
import { ScrollArea } from "../ui/scroll-area"
import Modal from "./Modal"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"
import FollowButton from "../FollowButton"

const OtherFriendModal = () => {

 const router = useRouter()

 const { onClose, isOpen, data } = useOtherFriendModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

 const { user, currentUser, users } = data 

 const navigateAndCloseModal = (userId: string) => {
  router.push(`/profile/${userId}`);
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
                   <div key={friendUser.id}>
                     <div className="flex items-center gap-5 mt-3">
                      <div className="flex items-center gap-5 cursor-pointer hover:font-medium
                        transition flex-1" onClick={() => navigateAndCloseModal(friendUser.id)}>
                         <Avatar src={friendUser.image}/>
                       <p>{friendUser.name}</p>
                     </div>
                     <button onClick={() => navigateAndCloseModal(friendUser.id)}
                     className="p-1.5 bg-[#00df9a] text-white rounded-lg font-medium hover:bg-[#0b8a62]
                      px-6 transition hidden sm:flex">
                    View
                  </button>
                   </div>
                    </div>
                   ) : null;
                    }
                    return null;
                   })}
                 {currentUser && friend.userIds.includes(currentUser.id) && (
                 <div key={currentUser.id}>
                    <div className="flex items-center gap-5 mt-3">
                    <div className="flex items-center gap-5 cursor-pointer hover:font-medium
                     transition flex-1" onClick={() => navigateAndCloseModal(currentUser.id)}>
                    <Avatar src={currentUser.image}/>
                    <p>{currentUser.name}</p>
                    </div>
                    <button onClick={() => navigateAndCloseModal(currentUser.id)}
                     className="p-1.5 bg-[#00df9a] text-white rounded-lg font-medium hover:bg-[#0b8a62]
                      px-6 transition hidden sm:flex">
                    View
                  </button>
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