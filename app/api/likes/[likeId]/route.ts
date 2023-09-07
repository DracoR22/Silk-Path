import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { likeId: string }}) {
    try {
        const { likeId } = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.id) {
            return new NextResponse('Unuthorized', { status: 401 })
        }

        const existingLike = await prismadb.like.findUnique({
            where: {
                id: likeId
            },
            include: {
                post: true,
                user: true
            }
        })

        if(!existingLike) {
            return new NextResponse('Missing ID', { status: 400 })
        }

        const deleteLike = await prismadb.like.deleteMany({
            where: {
                id: likeId,
                userId: currentUser.id
            }
        })

        return NextResponse.json(deleteLike)
    } catch (error) {
        console.log('LIKE_ID_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}