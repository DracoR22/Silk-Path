import getUsers from "@/actions/getUsers"
import UserList from "./components/UserList"
import getRequests from "@/actions/getRequests"
import getCurrentUser from "@/actions/getCurrentUser"
import getFriends from "@/actions/getFriends"

const Page = async () => {

 const currentUser = await getCurrentUser()
 const requests = await getRequests()
 const friends = await getFriends()
 const users = await getUsers()

  return (
    <div>
      <UserList items={users} currentUser={currentUser} requests={requests} friends={friends}/>
    </div>
  )
}

export default Page
