'use client'

import Avatar from "@/components/Avatar"
import FollowButton from "@/components/FollowButton"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { FullFriendType, FullRequestType } from "@/types"
import { User } from "@prisma/client"
import axios from "axios"
import { UserCog, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface Props {
    data: User
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
}

const UserBox = ({ data, currentUser, requests, friends }: Props) => {

  const router = useRouter()
 
  return (
    <>
      <div className="flex items-center mb-6 w-full">
        <div className="flex items-center cursor-pointer" onClick={() => router.push(`/profile/${data.id}`)}>
        <Avatar src={data.image}/>
        <p className="text-white ml-4 hidden sm:flex">{data.name}</p>
        </div>
  
         <div className="absolute right-[40px]">
          <FollowButton user={data} currentUser={currentUser} requests={requests} friends={friends}/>
        </div>
      </div>
    </>
  )
}

export default UserBox;