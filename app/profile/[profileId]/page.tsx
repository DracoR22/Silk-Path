import getCurrentUser from "@/actions/getCurrentUser"
import UserProfile from "./components/UserProfile"
import getUserById from "@/actions/getUserById"
import getRequests from "@/actions/getRequests"

interface IParams {
  profileId: string
}

const Page = async ({params}: { params: IParams }) => {

 const currentUser = await getCurrentUser()
 const user = await getUserById(params.profileId)
 const requests = await getRequests()

  return (
    <div>
      <UserProfile user={user} currentUser={currentUser} requests={requests}/>
    </div>
  )
}

export default Page
