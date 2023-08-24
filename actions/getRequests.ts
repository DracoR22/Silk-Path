import prismadb from "@/lib/prismadb"
import getCurrentUser from "./getCurrentUser"

const getRequests = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser?.id) {
        return []
    }

    try {
        const requests = await prismadb.request.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true
            }
        })

        return requests
    } catch (error: any) {
        return []
    }
}

export default getRequests