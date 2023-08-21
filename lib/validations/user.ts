import * as z from 'zod'

export const RegisterValidation = z.object({
    email: z.string().email({ message: 'Invalid email format' }).min(3),
    name: z.string().min(3, { message: 'name must be 3 characters minimum' }).max(30, { message: 'name has a maximum of 30 characters'}),
    password: z.string().min(3, { message: 'password must be 6 characters minimum' }).max(30, { message: 'password has a maximum of 40 characters'}),
})