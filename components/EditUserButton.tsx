'use client'

import useEditUserModal from '@/hooks/useEditUserModal'
import { User } from '@prisma/client'
import { BiSolidEdit } from 'react-icons/bi'

interface Props {
    user?: User | null
}

const EditUserButton = ({user}: Props) => {

 const { onOpen } = useEditUserModal()

  return (
    <div className="hidden sm:flex items-center gap-2 p-2 bg-neutral-900 rounded-lg cursor-pointer px-6 mx-10"
    onClick={() => onOpen({user})}>
         <BiSolidEdit size={25}/>
              Edit
     </div>
  )
}

export default EditUserButton
