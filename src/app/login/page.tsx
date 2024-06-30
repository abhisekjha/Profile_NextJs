'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import PasskeyRegister from "@/app/login/PasskeyRegister";
import PasskeyLogin from "@/app/login/PasskeyLogin";
import React, {useEffect, useState} from "react";

export default function Component() {
    const [username, setUsername] = useState("");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsAvailable(available);
        };
        checkAvailability();
    }, []);

    return (
        <>
        {isAvailable ? (
        <div className="flex items-center justify-center min-h-[calc(100vh_-_theme(spacing.16))]">
        <div className="bg-muted p-8 rounded-md shadow-lg w-full max-w-xs">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium leading-none">
                        Register
                    </Label>
                    <div className="relative">
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            className="pl-10 pr-4 py-3 rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <UserIcon className="w-5 h-5 text-muted-foreground"/>
                        </div>
                    </div>
                    <PasskeyRegister username={username}/>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                        <div className="h-[1px] bg-muted-foreground flex-1"/>
                        <div className="text-muted-foreground">or</div>
                        <div className="h-[1px] bg-muted-foreground flex-1"/>
                    </div>
                    <PasskeyLogin />
                </div>

            </div>
        </div>
        </div>
        ) : (
        <p>webauthn unavailable</p>
        )}
        </>
    );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}