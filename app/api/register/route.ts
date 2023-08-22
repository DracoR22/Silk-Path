import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, name, password } = await req.json()

    if(!email || !name || !password) {
        return new NextResponse('Missing Info', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}