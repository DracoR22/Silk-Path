import getCurrentUser from "@/actions/getCurrentUser"
import UserProfile from "./components/UserProfile"
import getUserById from "@/actions/getUserById"
import getRequests from "@/actions/getRequests"
import getFriends from "@/actions/getFriends"
import getUsers from "@/actions/getUsers"
import getPosts from "@/actions/getPosts"

interface IParams {
  profileId: string
}

const Page = async ({params}: { params: IParams }) => {

 const currentUser = await getCurrentUser()
 const user = await getUserById(params.profileId)
 const requests = await getRequests()
 const friends = await getFriends()
 const users = await getUsers()
 const posts = await getPosts()

  return (
    <div>
      <UserProfile user={user} currentUser={currentUser} requests={requests} friends={friends} users={users} posts={posts}/>
    </div>
  )
}

export default Page
