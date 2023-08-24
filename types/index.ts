import { Friend, Request, User } from "@prisma/client";

export type FullRequestType = Request & {
    users: User[]
}

export type FullFriendType = Friend & {
    users: User[]
}