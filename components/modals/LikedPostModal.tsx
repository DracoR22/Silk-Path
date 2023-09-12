'use client'

import { useRouter } from "next/navigation"
import { ScrollArea } from "../ui/scroll-area"
import Modal from "./Modal"
import useLikedPostModal from "@/hooks/useLikedPostModal"
import Avatar from "../Avatar"
import useLoginModal from "@/hooks/useLoginModal"

const LikedPostModal = () => {

 const router = useRouter()

 const loginModal = useLoginModal()

 const { onClose, isOpen, data } = useLikedPostModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

 const { post, currentUser } = data

 const navigateAndCloseModal = (userId: string) => {
    if(currentUser) {
      router.push(`/profile/${userId}`);
      onClose();
    } else {
      onClose();
      loginModal.onOpen()
    }
  };

  return (
    <Modal title="Likes"  isOpen={isOpen} onChange={onChange}>
      <ScrollArea>
        {post?.likes && post?.likes.length > 0 ? (
             <div>
                {post?.likes.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-5 mt-3">
                    <div className="flex items-center gap-5 cursor-pointer hover:font-medium
                     transition flex-1" onClick={() => navigateAndCloseModal(item.userId)}>
                    <Avatar src={item.user.image}/>
                    <p>{item.user.name}</p>
                    </div>
                    <button onClick={() => navigateAndCloseModal(item.userId)}
                     className="p-1.5 bg-[#00df9a] text-white rounded-lg font-medium hover:bg-[#0b8a62]
                      px-6 transition hidden sm:flex">
                    View
                  </button>
                  </div>
                </div>
             ))}
             </div>
        ) : (
            <div className="text-neutral-400">
                Be the first to like this post!
            </div>
        )}
      </ScrollArea>
    </Modal>
  )
}

export default LikedPostModal