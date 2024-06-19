'use client';

import { FormEvent, useState } from "react";
import { getAuthenticationOptions, verifyAuth } from "@/lib/webauthn/server/authentication";
import { startAuthentication } from '@simplewebauthn/browser';
import { AuthenticationResponseJSON } from "@simplewebauthn/types";
import {Button} from "@/components/ui/button";

export default function PasskeyLogin() {
    const [error, setError] = useState<string>("");

    async function onClick(e: FormEvent) {
        e.preventDefault();

        try {
            //0 Get auth options
            const authOpt = await getAuthenticationOptions();
            //1 Start auth
            const authResp: AuthenticationResponseJSON = await startAuthentication(authOpt);
            //2 Verify resp
            await verifyAuth(authResp);
        } catch(e) {
            const err = e as Error;
            setError(err.message);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <>
            <Button
                className="w-full"
                onClick={(e) => onClick(e)}
            >
                Passkey Sign in
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}