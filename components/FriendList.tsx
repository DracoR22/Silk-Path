'use client'

import useOtherUser from "@/hooks/useOtherUser"
import { FullFriendType } from "@/types"
import Avatar from "./Avatar"
import { Button } from "./ui/Button"
import { useCallback, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import useFriendModal from "@/hooks/useFriendModal"


interface Props {
    friend: FullFriendType
  }
  
  const FriendList = ({ friend }: Props) => {
  
    const otherUser = useOtherUser(friend)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { onClose } = useFriendModal()

    const handleDeleteFriend = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/friends/${friend.id}`)
        .then(() => router.refresh())
        .finally(() => setIsLoading(false))
    }, [friend.id, router, setIsLoading])

    const navigateAndCloseModal = (userId: string) => {
        // Navigate to the user's profile
       router.push(`/profile/${userId}`);
       // Close the modal
       onClose();
    }
  
    return (
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 cursor-pointer hover:font-medium transition" onClick={() => navigateAndCloseModal(otherUser.id)}>
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
  
  
  
  