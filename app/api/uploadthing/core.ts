import getCurrentUser from "@/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    const userId = await getCurrentUser()
    if(!userId) throw new Error('Unauthorized')
    return { userId: userId }
}
 
export const ourFileRouter = {
   postImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
   .middleware(() => handleAuth())
   .onUploadComplete(() => {}),
   userImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
   .middleware(() => handleAuth())
   .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;