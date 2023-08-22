'use client'

import useRoutes from "@/hooks/useRoutes"
import SidebarItem from "./SidebarItem"
import { User } from "@prisma/client"

interface Props {
  currentUser?: User | null
}

const Sidebar = ({currentUser}: Props) => {

  const routes = useRoutes()

  return (
    <section className="fixed left-0 top-0 mt-[92px] z-20 flex h-full w-fit flex-col justify-between overflow-auto
      pb-5 pt-28 max-md:hidden bg-black border-r border-t border-neutral-900">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 -mt-[70px]">
        {routes.map((item) => (
          <SidebarItem currentUser={currentUser} key={item.label} href={item?.href} icon={item.icon} active={item.active} label={item.label}/>
        ))}
      </div>
    </section>
  )
}

export default Sidebar
