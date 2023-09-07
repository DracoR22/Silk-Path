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

const SidebarItem = ({label, icon: Icon, href, active, currentUser}: Props) => {

  const loginModal = useLoginModal()

  return (
    <div>
      {currentUser ? (
        <Link href={href} className={cn(`group flex gap-x-3 p-3 text-md leading-6 font-semibold
        text-white hover:bg-neutral-900 transition duration-300 w-full rounded-md`, active && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
          <Icon className={cn(`h-6 w-6 shrink-0`, active && 'bg-[#00df9a] hover:bg-[#00df9a]')}/>
          <p className="hidden md:flex">
          {label}
          </p>
       </Link>
      ) : (
        <Link href={''} className={cn(`group flex gap-x-3 rounded-md p-3 text-md leading-6 font-semibold
       text-white hover:bg-neutral-900 transition duration-300 w-full`, active && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}
       onClick={loginModal.onOpen}>
         <Icon className={cn(`h-6 w-6 shrink-0`, active && 'bg-[#00df9a] hover:bg-[#00df9a]')}/>
         <p className="hidden md:flex">
         {label}
         </p>
      </Link>
      )}
    </div>
  )
}

export default SidebarItem
