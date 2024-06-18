'use client';

import {FormEvent, useEffect, useState} from "react";
import { supported } from "@github/webauthn-json";
import {getAuthenticationOptionsEmail, verifyAuth} from "@/lib/webauthn/server/authentication";
import { startAuthentication } from '@simplewebauthn/browser';
import {AuthenticationResponseJSON} from "@simplewebauthn/types";


export default function LoginEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);


    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsAvailable(available && supported());
        };
        checkAvailability();
    }, []);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            //0 Get auth options by email
            const authOpt = await getAuthenticationOptionsEmail(email);

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
            <form method="POST" onSubmit={onSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="submit" value="Login" />
                {error && <p>{error}</p>}
            </form>
        ) : (
            <p>webauthn unavailable on your device</p>
        )
    );

}