'use client'

import useRoutes from "@/hooks/useRoutes"
import SidebarItem from "./SidebarItem"
import { User } from "@prisma/client"
import Image from "next/image"
import Avatar from "../Avatar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  currentUser?: User | null
}

const Sidebar = ({currentUser}: Props) => {

  const routes = useRoutes()
  const pathname = usePathname()
  const profileActive = pathname === `/profile/${currentUser?.id}`

  return (
    <section className="fixed left-0 top-0 mt-[92px] z-20 flex h-full w-[200px] flex-col justify-between overflow-auto
      pb-5 pt-28 max-md:hidden bg-black border-r border-t border-neutral-900">
      <div className="flex w-full flex-1 flex-col gap-6 -mt-[70px]">
        {routes.map((item) => (
          <SidebarItem currentUser={currentUser} key={item.label} href={item?.href}
           icon={item.icon} active={item.active} label={item.label}/>
        ))}
        <Link href={`/profile/${currentUser?.id}`} className={cn(`group absolute bottom-[100px] p-3 text-md leading-6 font-semibold
        text-white hover:bg-neutral-900 w-full transition duration-300`, profileActive && 'bg-[#00df9a] hover:text-white hover:bg-[#00df9a]')}>
          <div className="flex items-center gap-x-3 mr-2">
           <Avatar src={currentUser?.image}/>
           <p>Profile</p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Sidebar
