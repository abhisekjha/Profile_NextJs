'use client';

import {useEffect, useState} from "react";
import {supported} from "@github/webauthn-json";
import PasskeyRegister from "@/components/PasskeyRegister";
import PasskeyLogin from "@/components/PasskeyLogin";


export default function Other() {
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsAvailable(available && supported());
        };
        checkAvailability();
    }, []);

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    {isAvailable ? (
                        <>
                            <PasskeyLogin />
                            <div>
                                <p className="text-center text-3xl font-extrabold text-gray-900">Register a new Passkey</p>
                            </div>
                            <PasskeyRegister/>
                        </>
                    ): (
                        <p>webauthn unavailable on this device</p>
                    )}

                    {/*<div className="flex items-center justify-center py-12">*/}

                    {/*</div>*/}


                </div>
            </div>
        </>
    );

}