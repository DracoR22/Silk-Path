import Container from "../Container"
import UserMenu from "./UserMenu"
import getCurrentUser from "@/actions/getCurrentUser"

const Navbar = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div className="fixed top-0 w-full bg-black border-b border-neutral-900 h-[50px]">
      <div className="py-2 relative">
        <Container>
            <div className="flex justify-end">
               <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
