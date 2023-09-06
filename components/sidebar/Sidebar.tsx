'use client'

import useRoutes from "@/hooks/useRoutes"
import SidebarItem from "./SidebarItem"
import { User } from "@prisma/client"
import Avatar from "../Avatar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlusSquare } from "lucide-react"
import useCreatePostModal from "@/hooks/useCreatePostModal"


interface Props {
  currentUser?: User | null
}

const Sidebar = ({currentUser}: Props) => {

  const routes = useRoutes()
  const pathname = usePathname()
  const profileActive = pathname === `/profile/${currentUser?.id}`
  const router = useRouter()

  const createPostModal = useCreatePostModal() 

  return (
    <section className="fixed left-0 top-0 hidden md:flex h-full w-[220px] flex-col justify-between overflow-auto
      pb-5 pt-[20px] max-md:hidden bg-black border-r border-neutral-900 px-3">
      <div className="flex w-full flex-1 flex-col gap-6 ">
         <div className="ml-2">
         <Image alt='Logo' className='cursor-pointer bg-cover '
       height={60} width={60} src='/mooonbg.png' onClick={() => router.push('/')}/>
         </div>
        {routes.map((item) => (
          <SidebarItem currentUser={currentUser} key={item.label} href={item?.href}
           icon={item.icon} active={item.active} label={item.label}/>
        ))}
        <div>
          <div className="group flex gap-x-3 p-3 text-md leading-6 font-semibold
          text-white hover:bg-neutral-900 transition duration-300 w-full rounded-md cursor-pointer"
          onClick={createPostModal.onOpen}>
           <PlusSquare className="h-6 w-6 shrink-0"/>
           <p>
             Create
           </p>
          </div>
        </div>
        {currentUser && (
          <Link href={`/profile/${currentUser?.id}`} className={cn(`group absolute bottom-[20px] p-2 text-md leading-6 font-semibold
          text-white hover:bg-neutral-900 w-[200px] transition duration-300 rounded-md`, profileActive && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
            <div className="flex items-center gap-x-3 mr-2">
             <Avatar src={currentUser?.image}/>
             <p className="truncate">{currentUser.name}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}

export default Sidebar
