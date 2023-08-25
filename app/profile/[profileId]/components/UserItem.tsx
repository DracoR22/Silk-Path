'use client'

import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { FullFriendType, FullRequestType } from "@/types"
import { Friend, Request, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface Props {
    user?: User & { requests: Request[], friends: Friend[] } | null
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
}

const UserItem = ({user, currentUser, requests, friends}: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const userHasPendingRequest = currentUser && requests.some(request => request.requestedId === user?.id && request.userIds.includes(currentUser.id));
  const usersAreFriends = currentUser && user
  ? friends.some(
      (friend) =>
        (friend.creatorId === currentUser.id &&
          friend.userIds.includes(user?.id)) ||
        (friend.creatorId === user?.id && friend.userIds.includes(currentUser.id))
    )
  : false;

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/requests', { userId: user?.id })
      .then(() => router.refresh())
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleDeleteFriend = useCallback(() => {
    setIsLoading(true);
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    if(!user?.id) {
      setIsLoading(false)
      return
    }

    const friendIdToDelete = friends.find(
      (friend) =>
        (friend.creatorId === currentUser?.id &&
          friend.userIds.includes(user?.id)) ||
        (friend.creatorId === user?.id &&
          friend.userIds.includes(currentUser?.id))
    )?.id;
  
    if (friendIdToDelete) {
      axios
        .delete(`/api/friends/${friendIdToDelete}`)
        .then(() => router.refresh())
        .catch(() =>
          toast({
            variant: "destructive",
            description: "Something went wrong while removing the friend.",
          })
        )
        .finally(() => setIsLoading(false));
    }
  }, [currentUser?.id, user?.id, friends, router, setIsLoading, toast]);


  return (
    <div>
      {userHasPendingRequest && (
         <Button variant='default' isLoading={isLoading} className="ml-8 bg-white hover:bg-neutral-300 transition text-black">Pending</Button>
      )}

      {!userHasPendingRequest && !usersAreFriends &&(
       <div onClick={handleClick}>
         <Button variant='silkPath' isLoading={isLoading} className="ml-8 transition">Follow</Button>
       </div>
      )}

      {usersAreFriends && (
        <div>
           <Button variant='default' isLoading={isLoading}
            className="ml-8 bg-white hover:bg-neutral-300 transition text-black"
            onClick={handleDeleteFriend}>
             Remove friend
           </Button>
        </div>
      )}
    </div>
  )
}

export default UserItem
