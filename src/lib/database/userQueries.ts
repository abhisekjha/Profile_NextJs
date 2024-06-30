import prisma from '@/lib/database/prismaClient';

//---Prisma DB Queries ---

export async function doesUserExist(username: string): Promise<boolean> {
   try {
       const user = await prisma.user.findUnique({ where: { username: username } });
       return user != null;
   } catch (e) {
       const error = e as Error;
       console.log(error.message);
       throw new Error("DB registration failed");
   }
}

//Get auth data by credential externalId
export async function getAuthenticationData(externalId: string) {
    const cred = await prisma.credential.findUnique({
        select: {
            id: true,
            publicKey: true,
            signCount: true,
            user: {
                select: {
                    id: true,
                    username: true,
                }
            }
        },
        where: {
            externalId: externalId
        }
    });
    if (!cred) throw new Error("Credential not found");
    return cred;
}

export async function getUserByUserId(userId: number) {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            username: true,
        },
        where: {
            id: userId
        }
    });
    if (!user) throw new Error("User not found");
    return user;
}

export async function saveAddress(userId: number, address: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) throw new Error("User not found");

    const updatedUser = await prisma.address.create({
        data: {
            address: address,
            user: {
                connect: { id: user.id },
            },
        },
    });
}