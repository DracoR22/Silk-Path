'use client'

import { EditUserValidation } from "@/lib/validations/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useState } from "react"
import { Button } from "../ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import axios from 'axios'
import { useToast } from "../ui/use-toast"
import { User } from "@prisma/client"
import FileUpload from "../FileUpload"
import { Textarea } from "../ui/textarea"
import useEditUserModal from "@/hooks/useEditUserModal"
import { useRouter } from "next/navigation"

interface Props {
    user?: User | null
}

type EditUserFormValues = z.infer<typeof EditUserValidation>

const EditUserForm = ({user}: Props) => {

 const [isLoading, setIsLoading] = useState(false)
 const { toast } = useToast()
 const editUserModal = useEditUserModal()
 const router = useRouter()

const form = useForm<EditUserFormValues>({
    resolver: zodResolver(EditUserValidation),
    defaultValues: {
      image: user?.image || '', 
      name: user?.name || '',       
      bio: user?.bio || ''           
    }
  })

 const onSubmit = async (data: EditUserFormValues) => {
    try {
      setIsLoading(true)
      await axios.post('/api/settings', data);
      toast({variant: 'silkPath', title: 'You updated your profile!'});
      editUserModal.onClose()
      router.refresh()
    } catch (error) {
      toast({variant: 'destructive', description: 'Invalid credentials'})
    } finally {
      setIsLoading(false)
    }
 }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-6">
        {/* IMAGE */}
        <div className='flex items-center justify-center text-center'>
            <FormField control={form.control} name='image' render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold mb-6'>
                        Add a photo to your post
                    </FormLabel>
                    <FormControl>
                      <FileUpload endpoint='userImage' value={field.value} onChange={field.onChange}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>
         {/* NAME */}
         <FormField control={form.control} name="name" render={({ field }) => (
           <FormItem className="flex flex-col gap-4 -mt-4">
              <FormLabel className="text-base semibold ml-2 -mb-3">
                Name
              </FormLabel>
              <FormControl>
               <Input type="text" {...field} 
               className="border border-neutral-900 bg-neutral-900 text-white focus-visible:ring-0
               focus-visible:ring-transparent focus-visible:ring-offset-0" placeholder="Name"/>
              </FormControl>
              <FormMessage/>
           </FormItem>
        )}/>
         {/* BIO */}
         <FormField control={form.control} name="bio" render={({ field }) => (
           <FormItem className="flex flex-col gap-4 -mt-4">
              <FormLabel className="text-base semibold ml-2 -mb-3">
               Bio
              </FormLabel>
              <FormControl>
              <Textarea disabled={isLoading}
                     className='bg-neutral-900 border-0 focus-visible:ring-0 text-neutral-100
                      focus-visible:ring-offset-0 text-sm' placeholder='Your bio...' {...field}/>
              </FormControl>
              <FormMessage/>
           </FormItem>
        )}/>
        <div>
        </div>
        <Button isLoading={isLoading} className="w-full" variant='silkPath' type="submit">
           Save
        </Button>
      </form>
    </Form>
  )
}

export default EditUserForm
