'use client'

import useOtherUser from "@/hooks/useOtherUser"
import { FullFriendType } from "@/types"
import { User } from "@prisma/client"
import Image from "next/image"
import Avatar from "./Avatar"

interface Props {
    friend: FullFriendType
}

const RightSidebar = ({friend}: Props) => {

  const otherUser = useOtherUser(friend)

  return (
    <div className="mt-2 mx-10">
      <div >
        <div className="flex-1 flex items-center gap-3">
         <Avatar src={otherUser.image}/>
         <p className="text-sm">{otherUser.name}</p>
        </div>
         <div className="text-sm">
           view
         </div>
      </div>
    </div>
  )
}

export default RightSidebar
