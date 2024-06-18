'use server';

import { generateAuthenticationOptions, verifyAuthenticationResponse } from "@simplewebauthn/server";
import { generateChallenge } from "@/lib/webauthn/util";
import { getChallengeCookie, setChallengeCookie, setAuthedUserCookie } from "@/lib/webauthn/browser/cookieStorage";
import { getCredentialData, getCredentialExternalIdByEmail } from "@/lib/database/queries";
import prisma from "@/lib/database/prismaClient"
import {AuthenticationResponseJSON} from "@simplewebauthn/types";

const HOST_SETTINGS = {
    expectedOrigin: process.env.SITE_URL ?? "http://localhost:3000",
    expectedRPID: process.env.RPID ?? "localhost",
};

// These options can be passed directly into @simplewebauthn/browser's startAuthentication() method.
export async function getAuthenticationOptionsEmail(email: string) {

    const creds = await getCredentialExternalIdByEmail(email);

    //Sets allowed Credentials for user, by their specified (email) identifier
    //By default will prompt user with credentials to select from
    const authOptions = await generateAuthenticationOptions({
        rpID: process.env.RPID as string,
        challenge: await generateChallenge() as string,
        allowCredentials: creds.map((c) =>({
            id: c,
            type: 'public-key'
        }))
    });
    await setChallengeCookie(authOptions.challenge);
    return authOptions;
}

// These options can be passed directly into @simplewebauthn/browser's startAuthentication() method.
//
export async function getAuthenticationOptions() {

    //Maybe get credentials of user , set allowedCredentials
    //Will prompt user with credentials to select from, since no specific cred specified
    const authOptions = await generateAuthenticationOptions({
        rpID: process.env.RPID as string,
        challenge: await generateChallenge() as string,
    });
    await setChallengeCookie(authOptions.challenge);
    return authOptions;
}

//Accepts that returned by startAuthentication()
export async function verifyAuth(authResp: AuthenticationResponseJSON) {

    const cred = await getCredentialData(authResp.id);

    let verification;
    try {
        verification = await verifyAuthenticationResponse({
            response: authResp,
            expectedChallenge: await getChallengeCookie() as string,
            authenticator: {
                credentialID: authResp.id,
                credentialPublicKey: new Uint8Array(cred.publicKey),
                counter: cred.signCount,
            },
            ...HOST_SETTINGS,
        });

        await prisma.credential.update({
            where: {
                id: cred.id
            },
            data: {
                signCount: verification.authenticationInfo.newCounter,
            }
        });

    } catch (e) {
        console.error(e);
        throw new Error("Authentication failed");
    }

    if(!verification.verified) throw new Error("Login Authentication failed");
    
    await setAuthedUserCookie(cred.userId, cred.user.username);
}

