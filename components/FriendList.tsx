'use client'

import useOtherUser from "@/hooks/useOtherUser"
import { FullFriendType } from "@/types"
import { Friend, Request, User } from "@prisma/client"
import Avatar from "./Avatar"
import { Button } from "./ui/Button"
import { useCallback, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


interface Props {
    friend: FullFriendType
  }
  
  const FriendList = ({ friend }: Props) => {
  
    const otherUser = useOtherUser(friend)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleDeleteFriend = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/friends/${friend.id}`)
        .then(() => router.refresh())
        .finally(() => setIsLoading(false))
    }, [friend.id, router, setIsLoading])
  
    return (
        <div className="bg-neutral-900 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(`/profile/${otherUser.id}`)}>
              <Avatar src={otherUser.image}/>
              {otherUser.name}
            </div>
             <div className="absolute right-[45px]">
             <Button variant='default' isLoading={isLoading}
             className="ml-8 bg-white hover:bg-neutral-300 transition text-black" onClick={handleDeleteFriend}>
              Remove friend
            </Button>
             </div>
          </div>
          
       </div>
    );
  }
  
  export default FriendList;
  
  
  
  