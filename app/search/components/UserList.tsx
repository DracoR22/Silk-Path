'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"
import { FullFriendType, FullRequestType } from "@/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Props {
    items: User[]
    currentUser?: User | null
    requests: FullRequestType[]
    friends: FullFriendType[]
}

const UserList = ({items, currentUser, requests, friends}: Props) => {

 const [searhText, setSearchText] = useState('')

  return (
    <div className="w-full block mt-4">
      <div className="flex-col">
      <div className="relative mb-6 hidden md:flex">
        <div className="absolute inset-y-0 left-3 flex items-center justify-center">
        <Search className="text-gray-400" />
      </div>
      <Input placeholder="Search users" onChange={(e) => setSearchText(e.target.value)}
       className="text-white bg-neutral-900 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border
        border-neutral-900 pl-12 pr-3 py-4 rounded-full"
        />
       </div>
        {items.filter((value) => {
          if(searhText === '') {
            return value
          } else if (value.name?.toLowerCase().includes(searhText.toLowerCase())) {
            return value
          }
        })
        .map((item) => (
            <UserBox key={item.id} data={item} currentUser={currentUser} requests={requests} friends={friends}/>
        ))}
        {/* Conditional rendering for no matching items */}
          {items.length > 0 && 
           items.filter((value) => {
          if (searhText === '') {
            return true; 
          } else if (value.name?.toLowerCase().includes(searhText.toLowerCase())) {
            return true;
          }
          return false;
        }).length === 0 && ( 
          <div className="text-neutral-700">No users found.</div>
        )}
      </div>
    </div>
  )
}

export default UserList
