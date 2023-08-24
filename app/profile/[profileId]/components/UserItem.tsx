'use client'

import { Button } from "@/components/ui/Button"
import { FullRequestType } from "@/types"
import { Friend, Request, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface Props {
    user?: User & { requests: Request[], friends: Friend[] } | null
    currentUser?: User | null
    requests: FullRequestType[]
}

const UserItem = ({user, currentUser, requests}: Props) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const userHasPendingRequest = currentUser && requests.some(request => request.requestedId === user?.id && request.userIds.includes(currentUser.id));

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/requests', { userId: user?.id })
      .then(() => router.refresh())
      .finally(() => setIsLoading(false));
  }, [user]);

  return (
    <div>
      {userHasPendingRequest && (
         <Button variant='default' isLoading={isLoading} className="ml-8 bg-white hover:bg-neutral-300 transition text-black">Pending</Button>
      )}

      {!userHasPendingRequest && (
       <div onClick={handleClick}>
         <Button variant='silkPath' isLoading={isLoading} className="ml-8 transition">Follow</Button>
       </div>
      )}
    </div>
  )
}

export default UserItem
