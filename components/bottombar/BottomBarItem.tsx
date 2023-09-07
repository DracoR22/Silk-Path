'use client'

import useLoginModal from "@/hooks/useLoginModal"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import Link  from "next/link"

interface Props {
    label: string
    icon: any
    href: string
    active?: boolean
    currentUser?: User | null
}

const BottomBarItem = ({label, icon: Icon, href, active, currentUser}: Props) => {

  const loginModal = useLoginModal()

  return (
    <div>
      {currentUser ? (
        <Link href={href} className={cn(`relative flex flex-col items-center
         gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5`,
          active && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
          <Icon className={cn(`h-6 w-6 shrink-0`, active && 'bg-[#00df9a] hover:bg-[#00df9a]')}/>
       </Link>
      ) : (
        <Link href={''} className={cn(`relative flex flex-col items-center
        gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5`, active && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}
       onClick={loginModal.onOpen}>
         <Icon className={cn(`h-6 w-6 shrink-0`, active && 'bg-[#00df9a] hover:bg-[#00df9a]')}/>
      </Link>
      )}
    </div>
  )
}

export default BottomBarItem
