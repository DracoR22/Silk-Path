'use client'

import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { FullFriendType, FullRequestType } from "@/types"
import { User } from "@prisma/client"
import axios from "axios"
import { UserCog, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface Props {
    user: User
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
    onClose?: () => void
    isModal?: boolean
}

const FollowButton = ({ user, currentUser, requests, friends, isModal, onClose }: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  const userHasPendingRequest = currentUser && requests.some(request => request.requestedId === user.id && request.userIds.includes(currentUser.id));
  const usersAreFriends = currentUser
  ? friends.some(
      (friend) =>
        (friend.creatorId === currentUser.id &&
          friend.userIds.includes(user.id)) ||
        (friend.creatorId === user.id && friend.userIds.includes(currentUser.id))
    )
  : false;

  

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/requests', { userId: user.id })
      .then(() => {
      if (isModal && onClose) {
        onClose(); // Close the modal after the request is complete
      }
      router.refresh();
      toast({variant: "silkPath", description: "Friend request sent!"})
    })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  const handleDeleteFriend = useCallback(() => {
    setIsLoading(true);
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const friendIdToDelete = friends.find(
      (friend) =>
        (friend.creatorId === currentUser?.id &&
          friend.userIds.includes(user.id)) ||
        (friend.creatorId === user.id &&
          friend.userIds.includes(currentUser?.id))
    )?.id;
  
    if (friendIdToDelete) {
      axios
        .delete(`/api/friends/${friendIdToDelete}`)
        .then(() => {
          if (isModal && onClose) {
            onClose(); // Close the modal after the request is complete
          }
          router.refresh();
          toast({variant: "silkPath", description: "Friend has been deleted from your friendlist"})
        })
        .catch(() =>
          toast({
            variant: "destructive",
            description: "Something went wrong while removing the friend.",
          })
        )
        .finally(() => setIsLoading(false));
    }
  }, [currentUser, user.id, friends, router, setIsLoading, toast]);

  return (
    <>
        {userHasPendingRequest && (
          <Button variant='default' isLoading={isLoading}
           className="ml-8 bg-white hover:bg-neutral-300 transition text-black">
           <span className="hidden sm:flex">Pending</span>
          </Button>
        )}

        {!userHasPendingRequest && !usersAreFriends && (
           <div onClick={handleClick}>
           <Button variant='silkPath' isLoading={isLoading} className="ml-8 transition">
            <UserPlus className="mr-2"/>
           <span className="hidden sm:flex">Send Request</span> 
           </Button>
          </div> 
        )}

        {usersAreFriends && (
            <Button variant='default' isLoading={isLoading}
             className="ml-8 bg-white hover:bg-neutral-300 transition text-black" onClick={handleDeleteFriend}>
              <UserCog className="mr-2"/>
             <span className="hidden sm:flex">Remove friend</span>
            </Button>
        )}
    </>
  )
}

export default FollowButton;