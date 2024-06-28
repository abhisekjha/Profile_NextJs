import {getAuthedUsername} from "@/lib/webauthn/browser/cookieStorage";

export default async function Page({ params }: { params: { username: string } }) {

    const user = await getAuthedUsername();
    //If page param matches authed username, show authed version e.g. profile settings options

    return (
        <p>{`${user}'s profile page, accessed via route: ${params.username}`}</p>
    );
}