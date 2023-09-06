import { Friend, Like, Post, Request, User } from "@prisma/client";

export type FullRequestType = Request & {
    users: User[]
}

export type FullFriendType = Friend & {
    users: User[]
}

export type FullPostType = Post & {
    likes: Like[]
}