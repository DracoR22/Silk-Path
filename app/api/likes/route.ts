import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const { postId } = await req.json()
        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const userName = currentUser?.name || '';
        const userImage = currentUser?.image || '';

        const newLike = await prismadb.like.create({
            data: {
                user: { connect: { id: currentUser.id } }, // Connect the user
                post: { connect: { id: postId } }, // Connect the post
                creatorId: currentUser.id,
                userName,
                userImage
            },
            include: {
                post: true,
                user: true,
            },
        });

        return NextResponse.json(newLike)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}