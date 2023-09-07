'use client'

import { useRouter } from "next/navigation"
import { ScrollArea } from "../ui/scroll-area"
import Modal from "./Modal"
import useLikedPostModal from "@/hooks/useLikedPostModal"
import Avatar from "../Avatar"

const LikedPostModal = () => {

 const router = useRouter()

 const { onClose, isOpen, data } = useLikedPostModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

 const { post } = data

 const navigateAndCloseModal = (userId: string) => {
    router.push(`/profile/${userId}`);
    onClose();
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
                    <Avatar src={item.userImage}/>
                    <p>{item.userName}</p>
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