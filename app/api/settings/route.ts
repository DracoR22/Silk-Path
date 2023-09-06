import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const {image, name, bio} = await req.json()

        if(!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const updateUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image,
                name,
                bio
            }
        })

        return NextResponse.json(updateUser)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}