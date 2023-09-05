import prismadb from "@/lib/prismadb"

const getPosts = async ()  => {
    try {
        const posts = await prismadb.post.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return posts
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getPosts