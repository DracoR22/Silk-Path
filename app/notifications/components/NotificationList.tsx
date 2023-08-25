'use client'

import { FullFriendType, FullRequestType } from "@/types"
import { User } from "@prisma/client"
import NotificationBox from "./NotificationBox"

interface Props {
    initialItems: FullRequestType[]
    currentUser?: User | null 
    friends: FullFriendType[]
}

const NotificationList = ({initialItems, currentUser, friends}: Props) => {
  return (
    <div className="w-full block">
    <div className="flex-col">
      {initialItems.map((item) => (
        <NotificationBox key={item.id} data={item} currentUser={currentUser} friends={friends}/>
      ))}
      {initialItems.length === 0 && (
        <div>
          <p className="text-neutral-400 text-lg">
            You have no new notifications
          </p>
        </div>
      )}
    </div>
  </div>
  )
}

export default NotificationList
