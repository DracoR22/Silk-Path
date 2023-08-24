import Avatar from "@/components/Avatar"
import { FullRequestType } from "@/types"
import { Friend, Request, User } from "@prisma/client"
import Image from "next/image"
import UserItem from "./UserItem"

interface Props {
    user?: User & { requests: Request[], friends: Friend[] } | null
    currentUser?: User | null
    requests: FullRequestType[]
}

const UserProfile = ({user, currentUser, requests}: Props) => {
  return (
    <div className="mx-4 sm:mx-[100px] my-[50px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <div>
            <Image src={user?.image || '/placeholder.jpg'} alt={user?.name || ''} width={150} height={150} className="rounded-full bg-cover"/>
         </div>

         <div className="sm:ml-[10px]">
            <div className="flex items-center">
              <p className="text-white font-medium text-xl">{user?.name}</p>
              {currentUser?.id !== user?.id && (
                <div>
                  
                <UserItem requests={requests} currentUser={currentUser} user={user}/>
                   
                </div>
              )}
            </div>

            <div className="mt-[25px] text-neutral-200">
                <span className="text-white font-medium">13</span> posts
                <span className="text-white font-medium ml-[45px]">41</span> friends
            </div>
         </div>
      </div>
    </div>
  )
}

export default UserProfile
