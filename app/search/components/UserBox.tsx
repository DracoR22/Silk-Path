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
    data: User
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
}

const UserBox = ({ data, currentUser, requests, friends }: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  const userHasPendingRequest = currentUser && requests.some(request => request.requestedId === data.id && request.userIds.includes(currentUser.id));
  const usersAreFriends = currentUser
  ? friends.some(
      (friend) =>
        (friend.creatorId === currentUser.id &&
          friend.userIds.includes(data.id)) ||
        (friend.creatorId === data.id && friend.userIds.includes(currentUser.id))
    )
  : false;

  

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/requests', { userId: data.id })
      .then(() => router.refresh())
      .finally(() => setIsLoading(false));
  }, [data]);

  const handleDeleteFriend = useCallback(() => {
    setIsLoading(true);
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const friendIdToDelete = friends.find(
      (friend) =>
        (friend.creatorId === currentUser?.id &&
          friend.userIds.includes(data.id)) ||
        (friend.creatorId === data.id &&
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
  }, [currentUser?.id, data.id, friends, router, setIsLoading]);

  return (
    <>
      <div className="flex items-center mb-6 w-full">
        <div className="flex items-center cursor-pointer" onClick={() => router.push(`/profile/${data.id}`)}>
        <Avatar src={data.image}/>
        <p className="text-white ml-4">{data.name}</p>
        </div>
  
        {userHasPendingRequest && (
          <Button variant='default' isLoading={isLoading} className="ml-8 bg-white hover:bg-neutral-300 transition text-black">Pending</Button>
        )}

        {!userHasPendingRequest && !usersAreFriends && (
           <div onClick={handleClick}>
           <Button variant='silkPath' isLoading={isLoading} className="ml-8 transition">Add friend</Button>
          </div> 
        )}

        {usersAreFriends && (
            <Button variant='default' isLoading={isLoading}
             className="ml-8 bg-white hover:bg-neutral-300 transition text-black" onClick={handleDeleteFriend}>
              Remove
            </Button>
        )}

      </div>
    </>
  )
}

export default UserBox;