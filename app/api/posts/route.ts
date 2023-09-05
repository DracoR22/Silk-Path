import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { imageUrl, content } = await req.json()

    if(!content || !imageUrl) {
        return new NextResponse('Missing Data', { status: 400 })
    }

    const userName = currentUser?.name || '';
    const userPicture = currentUser?.image || '';


    const post = await prismadb.post.create({
        data: {
            content,
            imageUrl,
            userId: currentUser.id,
            userName,
            userPicture
        }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.log('POST_ERROR', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}