'use client'

import { FullPostType } from "@/types"
import { Like, User } from "@prisma/client"
import { AiFillHeart } from 'react-icons/ai'
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "./ui/use-toast"

interface Props {
    currentUser?: User | null
    post: FullPostType
    item: Like
}

const LikeButton = ({currentUser, post, item}: Props) => {

    const router = useRouter()
    const { toast } = useToast()

    const userHasLikedPost = currentUser && post.likes.some(like => like.userId === currentUser.id);
  
    const handleDelete = useCallback(() => {
      if(!currentUser) {
        return toast({variant: "destructive", title: "Login to like posts"})
      }
      axios.delete(`/api/likes/${item.id}`)
      .then(() => router.refresh())
      .then(() => toast({variant: "silkPath", title: "Like removed"}))
      .catch(() => toast({variant: "silkPath", title: "Something went wrong while removing like"}))
  
    }, [currentUser, router]);

  return (
    <div>
          {userHasLikedPost && (
            <div onClick={handleDelete}>
              <AiFillHeart className="w-6 h-6 text-white cursor-pointer"/>
            </div>
          )}
    </div>
  )
}

export default LikeButton
