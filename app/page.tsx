import getCurrentUser from "@/actions/getCurrentUser"
import getFriends from "@/actions/getFriends"
import getPosts from "@/actions/getPosts"
import PostCards from "@/components/PostsCard"
import RightSidebar from "@/components/RightSidebar"


const Home = async () => {

const posts = await getPosts()
const currentUser = await getCurrentUser()
const friends = await getFriends()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr]">

    <div className="text-white flex flex-col justify-center items-center -mt-[30px]">
     {posts.map((post) => (
        <div key={post.id}>
          <PostCards post={post}/>
        </div>
      ))}
    </div>

    <div className="text-white hidden lg:flex h-full -mt-[40px] flex-col">
         <h2 className="text-xl font-semibold flex justify-center items-center mb-6">
           Contacts
         </h2>
           {friends.length > 0 && friends.map((friend) => (
             <div key={friend.id}>
                <RightSidebar friend={friend}/>
             </div>
           ))}
           {friends.length === 0 && (
            <div>
              You have no contacts yet
            </div>
           )}
    </div>

    </div>
  )
}

export default Home
