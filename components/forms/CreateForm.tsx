'use client'

import { CreatePostValidation } from '@/lib/validations/post'
import { useState } from 'react'
import * as z from 'zod'
import { useToast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import FileUpload from '../FileUpload'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/Button'
import useCreatePostModal from '@/hooks/useCreatePostModal'

type CreateFormValues = z.infer<typeof CreatePostValidation>

const CreateForm = () => {

 const [isLoading, setIsLoading] = useState(false)
 const { toast } = useToast()
 const createPostModal = useCreatePostModal()

 const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
        content: '',
        imageUrl: ''
    }
 })

 const onSubmit = async (data: CreateFormValues) => {
    try {
        setIsLoading(true)
        await axios.post('/api/posts', data)
        toast({variant: 'silkPath', title: 'You created a post!', description: 'Post created succesfully'});
        createPostModal.onClose()
    } catch (error) {
         toast({variant: 'destructive', description: 'An error happened while creating post'})
    } finally {
        setIsLoading(false)
    }
 }

  return (
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
       <div className='space-y-8 px-6'>
         {/* UPLOAD IMAGE USING UPLOADTHING */}
         <div className='flex items-center justify-center text-center'>
            <FormField control={form.control} name='imageUrl' render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-bold mb-6'>
                        Add a photo to your post
                    </FormLabel>
                    <FormControl>
                      <FileUpload endpoint='postImage' value={field.value} onChange={field.onChange}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>
         {/* CONTENT */}
         <FormField control={form.control} name='content' render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Textarea disabled={isLoading}
                     className='bg-neutral-800 border-0 focus-visible:ring-0 text-neutral-100
                      focus-visible:ring-offset-0 text-sm' placeholder='Add a description to your post' {...field}/>
                </FormControl>
            </FormItem>
         )}/>
       </div>
       <div className='py-4 px-6 '>
         <Button isLoading={isLoading} type='submit' variant='silkPath' className='w-full'>
            Create
         </Button>
       </div>
    </form>
   </Form>
  )
}

export default CreateForm
