import getCurrentUser from "@/actions/getCurrentUser"
import getPostById from "@/actions/getPostById"
import PostClient from "./components/PostClient"

interface IParams {
    postId: string
}

const Page = async ({ params }: { params: IParams }) => {

 const post = await getPostById(params)
 const currentUser = await getCurrentUser()

  return (
    <div>
      <PostClient post={post} currentUser={currentUser}/>
    </div>
  )
}

export default Page
