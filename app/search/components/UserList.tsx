'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface Props {
    items: User[]
}

const UserList = ({items}: Props) => {
  return (
    <div className="w-full block">
      <div className="flex-col">
        {items.map((item) => (
            <UserBox key={item.id} data={item}/>
        ))}
      </div>
    </div>
  )
}

export default UserList
