import Container from "../Container"
import Logo from "./Logo"
import UserMenu from "./UserMenu"

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-black border-b border-neutral-900 z-10">
      <div className="py-4">
        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
               <Logo/>
               <UserMenu/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
