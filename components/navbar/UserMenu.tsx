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


  return (
    <div className="relative mx-5">
     {!currentUser && (
      <div >
       <div >
          <Button className="px-10" variant='silkPath'
           onClick={registerModal.onOpen}>
            Register
          </Button>
      </div>
    </div>
     )}
    </div>
  )
}

export default UserMenu
