import Link from "next/link"
import { isAuthenticated } from "@/lib/webauthn/browser/cookieStorage";
import DropDownMenuAccount from "@/components/DropDownMenuAccount";
import {ReactNode} from "react";


export default async function NavBar({children}: { children: ReactNode }) {

    const isAuthed = await isAuthenticated();

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link href="/" className="flex items-center justify-center" prefetch={false}>
                    <span>Company Name</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    {isAuthed ? (
                        <DropDownMenuAccount/>
                    ) : (
                        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4"
                              prefetch={false}>
                            Login
                        </Link>
                    )}
                </nav>
            </header>
            <main className="flex-1">
                {children}
            </main>
            {/*<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">*/}
            {/*    <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>*/}
            {/*    <nav className="sm:ml-auto flex gap-4 sm:gap-6">*/}
            {/*        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>*/}
            {/*            Terms of Service*/}
            {/*        </Link>*/}
            {/*        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>*/}
            {/*            Privacy*/}
            {/*        </Link>*/}
            {/*    </nav>*/}
            {/*</footer>*/}
        </div>
    )
}