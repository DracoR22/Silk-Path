import * as z from 'zod'

export const RegisterValidation = z.object({
    email: z.string().email({ message: 'Invalid email format' }).min(3),
    name: z.string().min(3, { message: 'name must be 3 characters minimum' }).max(30, { message: 'name has a maximum of 30 characters'}),
    password: z.string().min(3, { message: 'password must be 6 characters minimum' }).max(30, { message: 'password has a maximum of 40 characters'}),
})

export const LoginValidation = z.object({
    email: z.string().email({ message: 'Invalid email format' }).min(3),
    password: z.string().min(3, { message: 'password must be 6 characters minimum' }).max(30, { message: 'password has a maximum of 40 characters'}),
})

export const EditUserValidation = z.object({
   image: z.string().min(1, { message: 'Provide a User image' }),
   name: z.string().min(3, { message: 'name must be 3 characters minimum' }).max(30, { message: 'name has a maximum of 30 characters'}),
   bio: z.string().min(3, { message: 'bio must be 3 characters minimum' }).max(200, { message: 'bio has a maximum of 200 characters'}),
})