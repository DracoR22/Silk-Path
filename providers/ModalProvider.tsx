'use client'

import RegisterModal from "@/components/modals/RegisterModal"
import LoginModal from "@/components/modals/LoginModal"
import { useEffect, useState } from "react"
import FriendModal from "@/components/modals/FriendModal"
import { FullFriendType } from "@/types"
import { User } from "@prisma/client"
import OtherFriendModal from "@/components/modals/OtherFriendModal"

interface Props {
   friends: FullFriendType[]
   currentUser?: User| null
   users: User[]
}

const ModalProvider = ({friends, currentUser, users}: Props) => {

 const [isMounted, setIsMounted] = useState(false)

 useEffect(() => {
    setIsMounted(true)
 }, [])

 if(!isMounted) {
    return null
 }

  return (
    <>
    <RegisterModal/>
    <LoginModal/>
    <FriendModal friends={friends}/>
    <OtherFriendModal friends={friends} users={users}/>
    </>
  )
}

export default ModalProvider
