
import getCurrentUser from "@/actions/getCurrentUser"
import { Home, Search, Heart, PlusSquare, UserCircle2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useRoutes = () => {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            label: 'Home',
            href: '/',
            icon: Home,
            active: pathname === '/'
        },
        {
            label: 'Search',
            href: '/search',
            icon: Search,
            active: pathname === '/search'
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: Heart,
            active: pathname === '/notifications'
        },
        {
            label: 'Create',
            href: '/create',
            icon: PlusSquare,
            active: pathname === '/create'
        },
        
    ], [pathname])

    return routes
}

export default useRoutes