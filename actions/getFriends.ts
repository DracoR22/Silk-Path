import prismadb from "@/lib/prismadb"
import getCurrentUser from "./getCurrentUser"

const getFriends = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser?.id) {
        return []
    }

    try {
        const friends = await prismadb.friend.findMany({
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

        return friends
    } catch (error: any) {
        return []
    }
}

export default getFriends