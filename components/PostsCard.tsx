'use client'

import { Post } from "@prisma/client"
import Avatar from "./Avatar"
import Image from "next/image"
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/Button"

interface Props {
    post: Post
}

const PostsCards = ({post}: Props) => {
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
          <Avatar src={post.userPicture}/>
          <p className="text-sm font-bold">{post.userName}</p>
          </div>
          <button>
            <MoreHorizontal/>
          </button>
        </div>
        <div className="mt-2">
          <Image src={post.imageUrl} alt="post" height={400} width={400}
           className="object-cover rounded-sm h-[450px]"/>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Heart className="w-6 h-6"/>
          <MessageCircle className="w-6 h-6"/>
        </div>
        <div className="mt-2 text-sm">
          <span className="font-semibold">123</span> likes
        </div>
        <div className="mt-2 border-b border-neutral-900 pb-6">
          <p className="text-sm truncate"><span className="font-bold">{post.userName}</span> {post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostsCards
