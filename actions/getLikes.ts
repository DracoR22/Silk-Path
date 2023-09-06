import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getLikes = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const likes = await prismadb.like.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        userId: currentUser.id
      },
      include: {
        user: true,
        post: true
      }
    });

    return likes;
  } catch (error: any) {
    return [];
  }
}

export default getLikes;