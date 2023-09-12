'use client'

import useRoutes from "@/hooks/useRoutes"
import { User } from "@prisma/client"
import Avatar from "../Avatar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Home, PlusSquare } from "lucide-react"
import useCreatePostModal from "@/hooks/useCreatePostModal"
import BottomBarItem from "./BottomBarItem"
import useLoginModal from "@/hooks/useLoginModal"


interface Props {
  currentUser?: User | null
}

const BottomBar = ({currentUser}: Props) => {

  const routes = useRoutes()
  const pathname = usePathname()
  const profileActive = pathname === `/profile/${currentUser?.id}`
  const homeActive = pathname === '/'
  const router = useRouter()

  const createPostModal = useCreatePostModal() 
  const loginModal = useLoginModal()

  const openModal = () => {
    if(!currentUser) {
      return loginModal.onOpen()
    }
    return createPostModal.onOpen()
  }


  return (
    <section className="fixed bottom-0 w-full rounded-t-3xl p-4 text-white bg-black backdrop-blur-lg px-4 sm:hidden">
      <div className="flex items-center justify-between gap-1">

         <Link href={'/'} className={cn(`relative flex flex-col items-center
          gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5`, homeActive && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
           <Home className={cn(`h-6 w-6 shrink-0`, homeActive && 'bg-[#00df9a] hover:bg-[#00df9a]')}/>
          </Link>

        {routes.map((item) => (
            <BottomBarItem currentUser={currentUser} key={item.label} href={item?.href}
           icon={item.icon} active={item.active} label={item.label}/>
        ))}
        <div>
          <div className="relative flex flex-col items-center
         gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 cursor-pointer"
          onClick={openModal}>
           <PlusSquare className="h-6 w-6 shrink-0"/>
          </div>
        </div>
        {currentUser && (
          <Link href={`/profile/${currentUser?.id}`} className={cn(`relative flex flex-col items-center
          gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5`, profileActive && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
            <div className="flex items-center gap-x-3 mr-2">
             <Avatar src={currentUser?.image}/>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}

export default BottomBar
