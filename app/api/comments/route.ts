import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const { postId, data } = await req.json()
        if(!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { text } = data;
        if(!text) {
            return new NextResponse('Text is missing', { status: 400 })
        }

        const userName = currentUser?.name || '';
        const userImage = currentUser?.image || '';

        const newComment = await prismadb.comment.create({
            data: {
                userId: currentUser.id,
                postId, 
                userName,
                userImage,
                text
            },
            include: {
                post: true,
                user: true,
            },
        });

        return NextResponse.json(newComment)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}