import * as z from 'zod'

export const CreatePostValidation = z.object({
    content: z.string().min(3, { message: 'content must be 3 characters minimum' }).max(200, { message: 'content has a maximum of 200 characters'}),
    imageUrl: z.string().min(1, { message: 'An image is required to create a post'})
})

export const CreateCommentValidation = z.object({
    text: z.string().min(1, { message: 'content must be 1 characters minimum' }).max(200, { message: 'content has a maximum of 200 characters'}),
})