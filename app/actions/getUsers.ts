import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { SafeUser } from "../types"; // Import the SafeUser type

const getUsers = async (): Promise<SafeUser[]> => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    // Transform the data to match SafeUser
    return users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null,
    }));
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;



// import prisma from '@/app/libs/prismadb';

// import getSession from "./getSession";

// const getUsers = async () => {
//     const session = await getSession();

//     if (!session?.user?.email) {
//         return [];
//     }

//     try {
//         const users = await prisma.user.findMany({
//             orderBy: {
//                 createdAt: 'desc',
//             },
//             where: {
//                 NOT: {
//                     email: session.user.email
//                 }
//             }
//         });

//         return users;
//     } catch (error: any) {
//         return [];
//     }
// }

// export default getUsers