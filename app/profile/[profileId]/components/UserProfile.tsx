'use client'

import { FullFriendType, FullRequestType } from "@/types"
import { Friend, Post, Request, User } from "@prisma/client"
import Image from "next/image"
import UserItem from "./UserItem"
import useFriendModal from "@/hooks/useFriendModal"
import useOtherFriendModal from "@/hooks/useOtherFriendModal"
import { Settings } from "lucide-react"
import useSettingsModal from "@/hooks/useSettingsModal"

interface Props {
    user?: User & { requests: Request[], friends: Friend[], posts: Post[] } | null
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
    users: User[]
    posts: Post[]
}

const UserProfile = ({user, currentUser, requests, friends, users, posts}: Props) => {

  const friendModal = useFriendModal()
  const { onOpen } = useOtherFriendModal()
  const settingsModal = useSettingsModal()

  return (
    <div className="mx-10 my-[30px] text-white">
      <div className="flex items-center gap-6">
         <div>
            <Image src={user?.image || '/placeholder.jpg'} alt={user?.name || ''} width={100} height={100} className="rounded-full bg-cover"/>
         </div>

         <div>
            <div className="flex items-center">
              <p className="font-medium text-xl">{user?.name}</p>
              {currentUser?.id !== user?.id && (
                <UserItem requests={requests} currentUser={currentUser} user={user} friends={friends}/>
              )}

              {currentUser?.id === user?.id && (
                <div className="ml-6 cursor-pointer" onClick={settingsModal.onOpen}>
                  <Settings/>
                </div>
              )}
            </div>

            <div className="mt-[25px] text-neutral-200 flex items-center">
                <span className="font-medium mr-1">{user?.posts.length} </span> posts
                {currentUser?.id === user?.id && (
                  <div onClick={friendModal.onOpen} className="cursor-pointer">
                  <span className="font-medium ml-[45px]">{user?.friends.length}</span> friends
                  </div>
                )}

                 {currentUser?.id !== user?.id && (
                  <div onClick={() => onOpen({ user, currentUser, friends, users})} className="cursor-pointer">
                  <span className="font-medium ml-[45px]">{user?.friends.length}</span> friends
                  </div>
                )}
            </div>
         </div>
      </div>
      <div className="mt-6">
        Hello everyone!
      </div>
      <div className="border-b border-neutral-900 w-full py-4"/>

      {/* GET USER POSTS */}
      <div className="mt-4">
        {user?.posts.map((post) => (
          <div>
           {post.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
