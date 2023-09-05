'use client'

import { Post } from "@prisma/client"
import Avatar from "./Avatar"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Props {
    post: Post
}

const PostsCards = ({post}: Props) => {
  return (
    <div>
      <div className="p-4 ">
        <div className="flex items-center gap-4">
          <Avatar src={post.userPicture}/>
          <p className="text-sm font-bold">{post.userName}</p>
        </div>
        <div className="mt-2">
          <Image src={post.imageUrl} alt="post" height={300} width={400}
           className="object-cover rounded-sm h-[450px]"/>
        </div>
        <div>
          <Heart className="w-6 h-6 mt-2"/>
        </div>
        <div className="mt-2">
          <p className="text-sm truncate"><span className="font-bold">{post.userName}</span> {post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostsCards
