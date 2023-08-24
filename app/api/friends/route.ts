import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const { userId } = await req.json()

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const newFriend = await prismadb.friend.create({
            data: {
                creatorId: currentUser.id,
                users: {
                    connect: [{
                        id: currentUser.id
                    },
                    {
                        id: userId
                    }
                ]
                }
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newFriend)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}