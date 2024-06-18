'use client';

import {clearSession} from "@/lib/webauthn/browser/cookieStorage";

export default function Logout() {
    return (
        <>
            <button onClick={() => clearSession()}>Logout</button>
        </>
    );
}