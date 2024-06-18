'use client';

import {getAuthedUsername} from "@/lib/webauthn/browser/cookieStorage";

export default function Page() {
    const username = getAuthedUsername();

    return (
        <>
            {username ? (
                <>
                    <p>You&apos;re authenticated!</p>
                    <p>{`Your username: ${username}`}</p>
                </>
            ): (
                <p>This is an priviledged page, but you&apos;re not authenticated!</p>
            )}
        </>
    );
}