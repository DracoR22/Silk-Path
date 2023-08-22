import getUsers from "@/actions/getUsers"
import UserList from "./components/UserList"

const Page = async () => {

 const users = await getUsers()

  return (
    <div>
      <UserList items={users}/>
    </div>
  )
}

export default Page
