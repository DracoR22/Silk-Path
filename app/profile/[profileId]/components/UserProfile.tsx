'use client'

import { FullFriendType, FullRequestType } from "@/types"
import { Friend, Request, User } from "@prisma/client"
import Image from "next/image"
import UserItem from "./UserItem"
import useFriendModal from "@/hooks/useFriendModal"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"
import { Settings } from "lucide-react"
import useSettingsModal from "@/hooks/useSettingsModal"

interface Props {
    user?: User & { requests: Request[], friends: Friend[] } | null
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
    users: User[]
}

const UserProfile = ({user, currentUser, requests, friends, users}: Props) => {

  const friendModal = useFriendModal()
  const { onOpen } = useOtherFriendModal()
  const settingsModal = useSettingsModal()

  return (
    <div className="mx-6 sm:mx-[50px] lg:mx-[200px] my-[30px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <div>
            <Image src={user?.image || '/placeholder.jpg'} alt={user?.name || ''} width={150} height={150} className="rounded-full bg-cover mx-0"/>
         </div>

         <div>
            <div className="flex items-center">
              <p className="text-white font-medium text-xl">{user?.name}</p>
              {currentUser?.id !== user?.id && (
              
                <UserItem requests={requests} currentUser={currentUser} user={user} friends={friends}/>
                
              )}

              {currentUser?.id === user?.id && (
                <div className="ml-6 cursor-pointer" onClick={settingsModal.onOpen}>
                  <Settings className="text-white"/>
                </div>
              )}
            </div>

            <div className="mt-[25px] text-neutral-200 flex items-center">
                <span className="text-white font-medium mr-1">13 </span> posts
                {currentUser?.id === user?.id && (
                  <div onClick={friendModal.onOpen} className="cursor-pointer">
                  <span className="text-white font-medium ml-[45px]">{user?.friends.length}</span> friends
                  </div>
                )}

                 {currentUser?.id !== user?.id && (
                  <div onClick={() => onOpen({ user, currentUser, friends, users})} className="cursor-pointer">
                  <span className="text-white font-medium ml-[45px]">{user?.friends.length}</span> friends
                  </div>
                )}
            </div>
         </div>
      </div>
    </div>
  )
}

export default UserProfile
