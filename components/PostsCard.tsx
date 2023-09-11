'use client'

import { Friend, Like, Post, User } from "@prisma/client"
import Avatar from "./Avatar"
import Image from "next/image"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "./ui/use-toast"
import useLikedPostModal from "@/hooks/useLikedPostModal"
import LikeButton from "./LikeButton"
import useLoginModal from "@/hooks/useLoginModal"
import moment from 'moment'

interface Props {
    post: Post & { user: User } & { likes: Like[] } 
    likes: Like[]
    currentUser?: User | null
}

const PostsCards = ({post, likes, currentUser}: Props) => {

  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useLikedPostModal()
  const loginModal = useLoginModal()

  const userHasLikedPost = currentUser && post.likes.some(like => like.userId === currentUser.id);

  const handleClick = useCallback(() => {
    if(!currentUser) {
      return toast({variant: "destructive", title: "Login to like posts"})
    }
    axios.post('/api/likes', { postId: post.id })
    .then(() => router.refresh())
    .then(() => toast({variant: "silkPath", title: "Post liked!"}))

  }, [currentUser, router, post.id, toast]);

  const handleNavigate = () => {
    if(!currentUser) {
      return loginModal.onOpen()
    }
    router.push(`/profile/${post.userId}`)

  }

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4 ">
            <div className="flex items-center gap-4 cursor-pointer" onClick={handleNavigate}>
            <Avatar src={post.user.image}/>
            <p className="text-sm font-bold">{post.user.name}</p>
             <p className="text-xs text-neutral-500">{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
        
        </div>
        <div className="mt-2 cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
          <Image src={post.imageUrl} alt="post" height={400} width={400}
           className="object-cover rounded-sm h-[450px]"/>
        </div>
        <div className="mt-3 flex items-center gap-2">
          
          {/* POST LIKE IF USER HASNT LIKED THE POST YET */}
        {!userHasLikedPost && (
            <div onClick={handleClick}>
              <Heart className="w-6 h-6 cursor-pointer"/>
            </div>
          )}
          {/* DELETE THAT USER LIKE */}
        {likes.filter((like) => like.postId === post.id).map((item) => (
           <div key={item.id}>
           <LikeButton currentUser={currentUser} post={post} item={item} />
          </div>
           ))}
            <div className="cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
            <MessageCircle/>
            </div>
        </div>
        <div className="mt-2 text-sm cursor-pointer" onClick={() => onOpen({post})}>
          <span className="font-semibold">{post.likes.length}</span> likes 
        </div>
        <div className="mt-2 border-b border-neutral-900 pb-6">
          <p className="text-sm truncate"><span className="font-bold">{post.user.name}</span> {post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostsCards
