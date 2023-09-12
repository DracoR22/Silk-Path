'use client'

import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/Button"
import { Form, FormControl, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import useDeletePostModal from "@/hooks/useDeletePostModal"
import useLoginModal from "@/hooks/useLoginModal"
import { CreateCommentValidation } from "@/lib/validations/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { Comment, Like, Post, User } from "@prisma/client"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'

interface Props {
  post: Post & { user: User } & { likes: Like[] } & { 
    comments: (Comment & { user: User })[]; // Include user information for each comment
} | null;
    currentUser?: User | null
}

type CommentFormValues = z.infer<typeof CreateCommentValidation>

const PostClient = ({ post, currentUser}: Props) => {

 const [isLoading, setIsLoading] = useState(false)
 const { toast } = useToast()
 const router = useRouter()
 const { onOpen } = useDeletePostModal()
 const loginModal = useLoginModal()

 const form = useForm<CommentFormValues>({
    resolver: zodResolver(CreateCommentValidation),
    defaultValues: {
      text: ''
    }
  })
 

const onSubmit = async (data: CommentFormValues) => {
  try {
    setIsLoading(true)
    if(currentUser) {
      await axios.post('/api/comments', { postId: post?.id, data})
      toast({variant: "silkPath", title: "Comment created!"})
      form.reset()
      router.refresh()
    } else {
      toast({variant: "destructive", title: "Login to comment a post"})
      loginModal.onOpen()
    }
  } catch (error) {
   if(axios.isAxiosError(error)) {
    if(error.response?.status === 401) {
      return toast({variant: "destructive", title: "Login to comment a post"})
    } else {
     return toast({variant: "destructive", title: "Something went wrong!"})
    }
   }
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="mx-10 my-6 text-white">

       <div className="flex justify-center items-center relative">
         <Image src={post?.imageUrl || ''} alt="Post" width={400} height={400} className="h-[450px] rounded-lg object-cover"/>
         <div className="absolute top-0 right-0">
           {currentUser?.id === post?.userId && (
            <div className="cursor-pointer" onClick={() => onOpen({ post, currentUser })}>
                 <MoreHorizontal/>
            </div>
           )}
        </div>
    
       </div>
       <div className="sm:flex sm:items-center gap-3 my-3 text-sm lg:mx-24 cursor-pointer"
        onClick={() => router.push(`/profile/${post?.userId}`)}>
          <Avatar src={post?.user.image}/>
         <p className="font-semibold hidden sm:flex">{post?.user.name}</p>
         <p className="text-neutral-400 mt-4 sm:mt-0">{post?.content}</p>
       </div>

       <div className="my-6 mx-10 hidden sm:flex">
        <p className="text-lg font-semibold">
            {post?.comments.length} <span>Comments</span>
        </p>
       </div>

       <div className=" my-6 mx-10">
        {post?.comments.map((comment) => (
           <div key={comment.id}>
             <div className="flex items-center gap-3 mb-3 cursor-pointer"
              onClick={() => router.push(`/profile/${comment.userId}`)}>
                <Avatar src={comment.user.image}/>
                <div>
                <p className="font-semibold text-sm mb-1">{comment.user.name}</p>
                <p className="text-xs font-semibold">{comment.text}</p>
             </div>
             </div>
           </div>
        ))}
       </div>

       <div className="overflow-hidden mt-4 mx-10 border-t border-b py-3 border-neutral-900">
         <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
            <Avatar src={currentUser?.image}/>
            <FormField control={form.control} name="text" render={({ field }) => (
                <FormControl>
            <Input placeholder="Post a comment" className="bg-black border-none text-white focus-visible:ring-0
              focus-visible:ring-transparent focus-visible:ring-offset-0" {...field}/>
                </FormControl>
            )}/>

            <Button variant='silkPath' disabled={isLoading}>
                Send
            </Button>
          </form>
         </Form>
       </div>
    </div>
  )
}

export default PostClient
