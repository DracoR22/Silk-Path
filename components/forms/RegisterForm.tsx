import { RegisterValidation } from "@/lib/validations/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useState } from "react"
import { Button } from "../ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FcGoogle } from 'react-icons/fc'


type RegisterFormValues = z.infer<typeof RegisterValidation>


const RegisterForm = () => {

 const [isLoading, setIsLoading] = useState(false)

 const form = useForm<RegisterFormValues>({
   resolver: zodResolver(RegisterValidation),
   defaultValues: {
     email: '',
     name: '',
     password: '',
   }
 })

 const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
 }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
        {/* EMAIL */}
        <FormField control={form.control} name="email" render={({ field }) => (
           <FormItem className="flex flex-col gap-4">
              <FormLabel className="text-base semibold ml-2 -mb-3">
                Email
              </FormLabel>
              <FormControl>
               <Input type="text" {...field} 
               className="border border-neutral-800 bg-neutral-700 text-white focus-visible:ring-0
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
               className="border border-neutral-800 bg-neutral-700 text-white focus-visible:ring-0
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
               className="border border-neutral-800 bg-neutral-700 text-white focus-visible:ring-0
               focus-visible:ring-transparent focus-visible:ring-offset-0" placeholder="Password"/>
              </FormControl>
              <FormMessage/>
           </FormItem>
        )}/>
        {/* FOOTER */}
        <div>

        <div className="flex items-center gap-4 mb-2">
          <hr className="flex-grow border-t border-neutral-700" />
          <div className="text-neutral-400 text-xs">Or</div>
          <hr className="flex-grow border-t border-neutral-700" />
        </div>
           
          <div>
             <Button onClick={() => {}} isLoading={isLoading}
              className="w-full bg-white text-black hover:bg-neutral-300">
               Continue with Google 
               <span className="ml-3">
               <FcGoogle />
               </span>
             </Button>
          </div>
        </div>
        <Button isLoading={isLoading} className="w-full" variant='silkPath'>
           Register 
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
