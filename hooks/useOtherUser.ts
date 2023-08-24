import { FullRequestType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (request: FullRequestType | { users: User[] }) => {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email

    const otherUser = request.users.filter((user) => user.email !== currentUserEmail)

    return otherUser[0]
  }, [session?.data?.user?.email, request.users])

  return otherUser
}

export default useOtherUser