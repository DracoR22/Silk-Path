import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { postId:string }}) {
try {
    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return new NextResponse('Unauthorized', { status: 400 })
    }

    if(!params.postId || typeof params.postId !== 'string') {
        return new NextResponse('POST ID is required', { status: 401 })
    }

    const deletePost = await prismadb.post.deleteMany({
        where: {
            id: params.postId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(deletePost)
} catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
}
}