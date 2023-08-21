'use client'

import useRegisterModal from "@/hooks/useRegisterModal"
import { Button } from "../ui/Button"

const UserMenu = () => {

 const registerModal = useRegisterModal()

  return (
    <div className="relative mx-5">
      <div className="flex items-center">
        <div className="mx-6">
            <Button className="px-10" variant='silkPath'
             onClick={registerModal.onOpen}>
              Register
            </Button>
        </div>
        <div className="font-medium text-white">
            Login
        </div>
      </div>
    </div>
  )
}

export default UserMenu
