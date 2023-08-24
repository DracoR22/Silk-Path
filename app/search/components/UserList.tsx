'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"
import { FullFriendType, FullRequestType } from "@/types"

interface Props {
    items: User[]
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
}

const UserList = ({items, currentUser, requests, friends}: Props) => {
  return (
    <div className="w-full block">
      <div className="flex-col">
        {items.map((item) => (
            <UserBox key={item.id} data={item} currentUser={currentUser} requests={requests} friends={friends}/>
        ))}
      </div>
    </div>
  )
}

export default UserList
