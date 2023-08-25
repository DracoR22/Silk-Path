'use client'

import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import useOtherUser from "@/hooks/useOtherUser"
import { FullFriendType, FullRequestType } from "@/types"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface Props {
    data: FullRequestType
    currentUser?: User | null
    friends: FullFriendType[]
}

const NotificationBox = ({data, currentUser}: Props) => {

 const otherUser = useOtherUser(data)
 const router = useRouter()
 const { toast } = useToast()

 const [isLoading, setIsLoading] = useState(false)

 const deleteRequest = useCallback(() => {
  axios.delete(`/api/requests/${data.id}`)
  .then(() => router.refresh())
  .catch(() => toast({variant: 'destructive', description: 'Something went wrong!'}))
 }, [data.id, router, toast])

 const handleFriend = useCallback(() => {
  setIsLoading(true);
  axios
    .delete(`/api/requests/${data.id}`)
    .then(() => axios.post('/api/friends', { userId: otherUser.id }))
    .then(() => router.refresh())
    .then(() => toast({variant: 'silkPath', description: `You and ${otherUser.name} are now friends!`}))
    .finally(() => setIsLoading(false));
}, [data.id, otherUser.id, router, otherUser.name, toast]);

  return (
    <div className="flex items-center mb-6 w-full">
      <div onClick={() => router.push(`profile/${otherUser.id}`)} className="cursor-pointer">
      <Avatar src={otherUser.image}/>
      </div>
         {currentUser?.id === data.requestedId && (
          <div className="flex items-center">
           <p className="text-white ml-6 font-bold cursor-pointer" onClick={() => router.push(`profile/${otherUser.id}`)}>
            {otherUser.name}
          </p>
           <p className="text-white ml-6">Sent you a friend request</p>
            <div className="ml-6">
            <Button variant='silkPath' size='sm' className="mr-6" onClick={handleFriend} isLoading={isLoading}>Confirm</Button>
            <Button variant='secondary' size='sm' onClick={deleteRequest}>Delete</Button>
            </div>
          </div>
         )}

         {currentUser?.id !== data.requestedId && (
           <div className="flex items-center">
            <p className="text-white mr-4 ml-6">You sent a friend request to</p>
            <p className="text-white font-bold cursor-pointer" onClick={() => router.push(`profile/${otherUser.id}`)}>
              {otherUser.name}
            </p>
         </div>
         )}
    </div>
  )
}

export default NotificationBox
