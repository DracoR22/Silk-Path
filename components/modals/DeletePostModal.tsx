'use client'

import { useRouter } from "next/navigation"
import Modal from "./Modal"
import useDeletePostModal from "@/hooks/useDeletePostModal"
import axios from "axios"
import { useToast } from "../ui/use-toast"

const DeletePostModal = () => {

 const router = useRouter()
 const { toast } = useToast()

 const { onClose, isOpen, data } = useDeletePostModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

 const { post, currentUser } = data

 const handleDeletePost = async () => {
    try {
    await axios.delete(`/api/posts/${post?.id}`)
    router.push(`/profile/${currentUser?.id}`)
    toast({variant: "silkPath", title: "Your post has been deleted!"})
    } catch (error) {
    toast({variant: "destructive", title: "Something went wrong!"})
    console.log(error)
    }
 }

  return (
    <Modal title="Post Settings" isOpen={isOpen} onChange={onChange}>
     <div className="flex items-center justify-center mt-4">
        <p className="cursor-pointer text-rose-500 hover:bg-neutral-900 p-4 w-full flex justify-center transition"
         onClick={handleDeletePost}>
            Delete Post
        </p>
     </div>
    </Modal>
  )
}

export default DeletePostModal