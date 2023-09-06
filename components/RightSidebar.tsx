'use client'

import useOtherUser from "@/hooks/useOtherUser"
import { FullFriendType } from "@/types"
import Avatar from "./Avatar"
import { useRouter } from "next/navigation"
import { ScrollArea } from "./ui/scroll-area"

interface Props {
    friend: FullFriendType
}

const RightSidebar = ({friend}: Props) => {

  const otherUser = useOtherUser(friend)
  const router = useRouter()

  return (
   <ScrollArea>
      <div className="mt-3 mx-8">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => router.push(`/profile/${otherUser.id}`)}>
         <Avatar src={otherUser.image}/>
         <p className="text-sm truncate">{otherUser.name}</p>
        </div>
         <div className="text-sm">
           <button onClick={() => router.push(`/profile/${otherUser.id}`)}
            className="p-1.5 bg-[#00df9a] text-white rounded-lg font-medium hover:bg-[#0b8a62] px-6 transition">
             View
           </button>
         </div>
      </div>
    </div>
   </ScrollArea>
  )
}

export default RightSidebar
