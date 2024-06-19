'use client';

import { FormEvent, useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { getRegistrationOptions, verifyRegistration } from "@/lib/webauthn/server/registration";
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/types";
import { Button } from "@/components/ui/button";

export default function PasskeyRegister({ username }: {username: string}) {
    const [error, setError] = useState("");

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            //0. Get registration options (from server)
            const regOpt: PublicKeyCredentialCreationOptionsJSON = await getRegistrationOptions(username);
            //0.5 challenge cookie is set in browser

            //1. Start registration (in browser)
            const regResp: RegistrationResponseJSON = await startRegistration(regOpt);

            //2. Verify response (in server)
            await verifyRegistration(regResp, username);
            //2.5 If successful, Browser receives authenticated session cookie
        } catch(e) {
            const error = e as Error;
            setError("Registration failed: " + error.message);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };


    return (
            <form method="POST" onSubmit={onSubmit} className="mt-8 space-y-6">
                    <Button
                        className="w-full"
                        type="submit"
                    >
                        Create new Passkey
                    </Button>
                    {error && <p className="text-red-500">{error}</p>}
            </form>
    );
}