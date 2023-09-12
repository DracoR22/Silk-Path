'use client'

import { RegisterValidation } from "@/lib/validations/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useState } from "react"
import { Button } from "../ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import { useToast } from "../ui/use-toast"
import useRegisterModal from "@/hooks/useRegisterModal"
import { signIn } from "next-auth/react"
import useLoginModal from "@/hooks/useLoginModal"


type RegisterFormValues = z.infer<typeof RegisterValidation>


const RegisterForm = () => {

 const [isLoading, setIsLoading] = useState(false)
 const { toast } = useToast()
 const registerModal = useRegisterModal()
 const loginModal = useLoginModal()

 const handleChangeModal = () => {
  registerModal.onClose()
  loginModal.onOpen()
}

 const form = useForm<RegisterFormValues>({
   resolver: zodResolver(RegisterValidation),
   defaultValues: {
     email: '',
     name: '',
     password: '',
   }
 })

 const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true)
      await axios.post('/api/register', data);
      toast({variant: 'silkPath', title: 'You created your profile!', description: 'Login to start posting!'});
      registerModal.onClose()
      loginModal.onOpen()
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          return toast({variant: 'destructive', description: 'This email is already taken'})
        } else {
          return toast({variant: 'destructive', description: 'Invalid credentials'})
        }
      }
    } finally {
      setIsLoading(false)
    }
 }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-6">
        {/* EMAIL */}
        <FormField control={form.control} name="email" render={({ field }) => (
           <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-base semibold ml-2 -mb-3">
                Email
              </FormLabel>
              <FormControl>
               <Input type="text" {...field} 
               className="border border-neutral-900 bg-neutral-900 text-white focus-visible:ring-0
               focus-visible:ring-transparent focus-visible:ring-offset-0" placeholder="Email"/>
              </FormControl>
              <FormMessage/>
           </FormItem>
        )}/>
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
         {/* PASSWORD */}
         <FormField control={form.control} name="password" render={({ field }) => (
           <FormItem className="flex flex-col gap-4 -mt-4">
              <FormLabel className="text-base semibold ml-2 -mb-3">
               Password
              </FormLabel>
              <FormControl>
               <Input type="text" {...field} 
               className="border border-neutral-900 bg-neutral-900 text-white focus-visible:ring-0
               focus-visible:ring-transparent focus-visible:ring-offset-0" placeholder="Password"/>
              </FormControl>
              <FormMessage/>
           </FormItem>
        )}/>
        {/* FOOTER */}
        <div>

        <div className="flex items-center gap-4 mb-2">
          <hr className="flex-grow border-t border-neutral-900" />
          <div className="text-neutral-400 text-xs">Or</div>
          <hr className="flex-grow border-t border-neutral-900" />
        </div>
           
          <div>
             <Button onClick={(e) => { e.preventDefault(); signIn('google') }} 
              className="w-full bg-neutral-900 text-white hover:bg-[#101010]">
               Continue with Google 
               <span className="ml-3">
               <FcGoogle />
               </span>
             </Button>
          </div>
        </div>
        <Button isLoading={isLoading} className="w-full" variant='silkPath' type="submit">
           Register 
        </Button>

              <div className="flex items-center gap-4 mb-1">
              <p className="text-neutral-400 text-xs cursor-pointer" onClick={handleChangeModal}>
                Already have an account? <span className="text-[#00df9a] hover:underline">Login</span>
              </p>
             </div>
      </form>
    </Form>
  )
}

export default RegisterForm
