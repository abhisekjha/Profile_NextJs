'use client';

import { FormEvent, useEffect, useState } from "react";
import { supported } from '@github/webauthn-json';
import { redirect } from "next/navigation";
import { startRegistration } from "@simplewebauthn/browser";
import { getRegistrationOptions, verifyRegistration } from "@/lib/webauthn/server/registration";
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/types";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [error, setError] = useState("");

    // Check if WebAuthn not supported, to fallback to traditional authentication
    useEffect(() => {
        const checkAvailability = async () => {
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsAvailable(available && supported());
        };
        checkAvailability();
    }, []);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        //Ensure user entered params are not invalid

        //0. Get registration options (from server)
        const regOpt: PublicKeyCredentialCreationOptionsJSON = await getRegistrationOptions(email, username);
        //0.5 challenge cookie is set in browser

        //1. Start registration (in browser)
        const regResp: RegistrationResponseJSON = await startRegistration(regOpt);

        //2. Verify response (in server)
        await verifyRegistration(regResp, email, username);
        //2.5 If successful, Browser receives authenticated session cookie

        redirect("/admin");
    };


    return (
        //Make component centered to page
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <p className="text-center text-3xl font-extrabold text-gray-900">Register Account</p>
                </div>
                {isAvailable ? (
                    <form method="POST" onSubmit={onSubmit} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">

                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <input type="submit" value="Register"/>
                        </div>
                    </form>
                    ) : (
                    <p>WebAuthn is not available</p>
                )}
            </div>
        </div>
    );
}