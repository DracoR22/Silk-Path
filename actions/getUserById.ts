import prismadb from "@/lib/prismadb"
import getCurrentUser from "./getCurrentUser"

const getUserById = async (profileId: string) => {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser?.email) {
            return null
        }

        const user = await prismadb.user.findUnique({
            where: {
                id: profileId
            },
            include: {
                requests: true,
                friends: true,
                posts: true
            }
        })

        return user
    } catch (error: any) {
        return null
    }
}

export default getUserById