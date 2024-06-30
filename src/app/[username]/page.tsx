import {getAuthedUsername} from "@/lib/webauthn/browser/cookieStorage";
import VerifyWallet from "@/app/[username]/VerifyWallet";
import prisma from "@/lib/database/prismaClient";

export default async function Page({ params }: { params: { username: string } }) {

    const user = await getAuthedUsername();
    const isAuthed = params.username === user;
    //If page param matches authed username, show authed version e.g. profile settings options

    const addrs = await prisma.user.findUnique({
        where: {
            username: params.username,
        },
        select: {
            addresses: true
        }
    })

    return (
        <>
            <h2>Addresses for {params.username}</h2>
            <ul>
                {addrs && addrs.addresses.map((item, index) => (
                    <li key={index}>
                        {item.address}
                    </li>
                ))}
            </ul>
            <hr/>
            {isAuthed &&
              <>
                <VerifyWallet />
              </>
            }

        </>
    );
}