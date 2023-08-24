import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, {params}: {params: {requestId: string}}) {
    try {
        const { requestId } = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const existingRequest = await prismadb.request.findUnique({
            where: {
                id: requestId,
            },
            include: {
                users: true
            }
        })

        if(!existingRequest) {
            return new NextResponse('Invalid Id', { status: 400 })
        }

        const deletedRequest = await prismadb.request.deleteMany({
            where: {
                id: requestId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        return NextResponse.json(deletedRequest)
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}