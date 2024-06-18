'use client';

import { FormEvent, useEffect, useState } from "react";
import { supported } from "@github/webauthn-json";
import { getAuthenticationOptions, verifyAuth } from "@/lib/webauthn/server/authentication";
import { startAuthentication } from '@simplewebauthn/browser';
import { AuthenticationResponseJSON } from "@simplewebauthn/types";


export default function Login() {
    const [error, setError] = useState<string>("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsAvailable(available && supported());
        };
        checkAvailability();
    }, []);

    async function onSubmit(e: FormEvent) {
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
        }
    }

    return (
        isAvailable ? (
            <>
                <button onClick={(e) => onSubmit(e)}>Sign in with a Passkey</button>
                {error && <p>{error}</p>}
            </>
        ) : (
            <p>webauthn unavailable on your device</p>
        )
    );

}