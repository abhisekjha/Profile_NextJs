import prisma from '@/lib/database/prismaClient';

//---Prisma DB Queries ---

export async function doesUserExist(email: string, username: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username },
            ]
        },
    });
    return user !== null;
}

export async function getCredentialExternalIdByEmail(email: string): Promise<string[]> {
    try {
        const user = await prisma.user.findUnique({
           where: { email },
           select: {
               credentials: {
                   select: {
                       externalId: true,
                   }
               }
           }
        });
        if(user && user.credentials){
            return user.credentials.map(cred => cred.externalId);
        } else return [];
    } catch (e) {
        console.error(e);
        throw new Error(`Failed to retrieve credentials for ${email}: ${e}`);
    }
}

export async function getCredentialData(externalId: string) {
    const cred = await prisma.credential.findUnique({
        select: {
            id: true,
            publicKey: true,
            signCount: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                }
            }
        },
        where: {
            externalId: externalId
        }
    });
    if (!cred) throw new Error();
    return cred;
}

export async function getUserByUserId(userId: number) {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            username: true,
        },
        where: {
            id: userId
        }
    });
    if (!user) throw new Error();
    return user;
}
