import getRequests from "@/actions/getRequests"
import NotificationList from "./components/NotificationList"
import getCurrentUser from "@/actions/getCurrentUser"
import getFriends from "@/actions/getFriends"

const Page = async () => {

 const requests = await getRequests()
 const currentUser = await getCurrentUser()
 const friends = await getFriends()

  return (
    <div>
      <NotificationList initialItems={requests} currentUser={currentUser} friends={friends}/>
    </div>
  )
}

export default Page