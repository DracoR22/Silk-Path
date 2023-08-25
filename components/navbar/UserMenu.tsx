'use client'

import useRegisterModal from "@/hooks/useRegisterModal"
import { Button } from "../ui/Button"
import useLoginModal from "@/hooks/useLoginModal"
import { User } from "@prisma/client"
import Avatar from "../Avatar"

interface Props {
  currentUser?: User | null
}

const UserMenu = ({currentUser}: Props) => {

 const registerModal = useRegisterModal()
 const loginModal = useLoginModal()

  return (
    <div className="relative mx-5">
     {currentUser ? (
       <div className="flex items-center">
         <Avatar src={currentUser?.image}/>
       </div>
     ) : (
      <div className="flex items-center">
      <div className="mx-6">
          <Button className="px-10" variant='silkPath'
           onClick={registerModal.onOpen}>
            Register
          </Button>
      </div>
      <div className="font-medium text-white hover:text-[#00df9a] transition cursor-pointer"
       onClick={loginModal.onOpen}>
          Login
      </div>
    </div>
     )}
    </div>
  )
}

export default UserMenu
