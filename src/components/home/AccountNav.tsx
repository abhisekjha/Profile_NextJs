import Link from "next/link"
import AccountDropDown from "@/components/home/AccountDropDown";
import {getAuthedUsername} from "@/lib/webauthn/browser/cookieStorage";

export default async function AccountNav() {
    const auth = await getAuthedUsername();

    return (
        <>
            {auth ? (
                <AccountDropDown user={auth}/>
            ) : (
                <Link
                    href="/login"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                >
                    Login
                </Link>
            )}
        </>
    )
}