import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, {params}: {params: {friendId: string}}) {
    try {
        const {friendId} = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const existingFriend = await prismadb.friend.findUnique({
            where: {
                id: friendId
            },
            include: {
                users: true
            }
        })

        if(!existingFriend) {
            return new NextResponse('Invalid Id', { status: 400 })
        }

        const deletedFriend = await prismadb.friend.deleteMany({
            where: {
                id: friendId,
                userIds: {
                    hasSome:[currentUser.id]
                }
            }
        })

        return NextResponse.json(deletedFriend)
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}