'use client'

import Avatar from "@/components/Avatar"
import { User } from "@prisma/client"

interface Props {
    data: User
}

const UserBox = ({data}: Props) => {

  return (
    <>
     <div className="flex items-center mb-4 w-full cursor-pointer">
         <Avatar src={data.image}/>
         <p className="text-white ml-4">{data.name}</p>
         <p className="text-white ml-4">Follow</p>
     </div>
    </>
  )
}

export default UserBox
