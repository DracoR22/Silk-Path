import { cn } from "@/lib/utils"
import Link  from "next/link"

interface Props {
    label: string
    icon: any
    href: string
    active?: boolean
}

const SidebarItem = ({label, icon: Icon, href, active}: Props) => {
  return (
    <div>
      <Link href={href} className={cn(`group flex gap-x-3 rounded-md p-3 text-md leading-6 font-semibold
       text-white hover:text-[#00df9a] transition w-full`, active && 'bg-[#00df9a] hover:text-white')}>
         <Icon className={cn(`h-6 w-6 shrink-0`, active && 'bg-[#00df9a]')}/>
         <p>
         {label}
         </p>
      </Link>
    </div>
  )
}

export default SidebarItem
