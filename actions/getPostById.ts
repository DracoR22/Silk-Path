import prismadb from "@/lib/prismadb"

interface IParams {
    postId?: string
}

const getPostById = async (params: IParams) => {
    try {
        const {postId} = params

        const post = await prismadb.post.findUnique({
            where: {
               id: postId
            },
            include: {
                user: true,
                likes: true,
                comments: {
                    include: {
                        user: true, // Include user information for each comment
                    },
                }
            }
        })

        if(!post) {
            return null
        }

        return post
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getPostById