'use server';

import prisma from '@/lib/database/prismaClient';
import { generateRegistrationOptions, VerifiedRegistrationResponse, verifyRegistrationResponse } from "@simplewebauthn/server";
import { clean, generateChallenge } from "@/lib/webauthn/util";
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/types";
import { getChallengeCookie, setChallengeCookie, setAuthedUserCookie } from "@/lib/webauthn/browser/cookieStorage";
import { doesUserExist } from "@/lib/database/queries";

const HOST_SETTINGS = {
    expectedOrigin: process.env.SITE_URL ?? "http://localhost:3000",
    expectedRPID: process.env.RPID ?? "localhost",
};

//Get user's entered params from registration form
// Returned options can be passed to @simplewebauthn/browser's startRegistration()
export const getRegistrationOptions = async (email: string, username: string): Promise<PublicKeyCredentialCreationOptionsJSON> => {

    //Note: will generate random userID by default, may not be coherent with DB
    const regOptions =  await generateRegistrationOptions({
        //Name of service
        rpName: process.env.SERVICE_NAME as string || 'example site name',
        //Domain name
        rpID: process.env.RPID as string || 'localhost',
        userName: email,
        challenge: await generateChallenge(),
        userDisplayName: username,
    });

    //Save created challenge to user's session cookie
    await setChallengeCookie(regOptions.challenge);

    return regOptions;
}

//Accepts the value returned by @simplewebauthn/browser's startRegistration(), and verifies it
export const verifyRegistration = async (
    credential: RegistrationResponseJSON,
    email: string,
    username: string,
) => {
    if(credential === null) throw new Error("Invalid credential");

    let verification: VerifiedRegistrationResponse;
    try {
        verification = await verifyRegistrationResponse({
            //Response returned by @simplewebauthn/ browser's startAuthentication()
            response: credential,
            // Use challenge stored in user session cookie as expected challenge
            // Will be Base64 encoded challenge, as generated by getRegistrationOptions
            expectedChallenge: await getChallengeCookie() as string,
            requireUserVerification: true,
            ...HOST_SETTINGS,
        });
    } catch(error) {
        console.error(error);
        throw error;
    }

    if(!verification.verified) throw new Error("Registration verification failed.");

    const { credentialID, credentialPublicKey } = verification.registrationInfo ?? {};

    if (credentialID == null || credentialPublicKey == null) throw new Error("Registration failed");

    //Check if username and email are available for registration
    if(await doesUserExist(email, username)) throw new Error("Invalid identification for registration");

    //Save valid user registration to DB
    try {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                credentials: {
                    create: {
                        externalId: await clean(credentialID),
                        publicKey: Buffer.from(credentialPublicKey),
                    },
                },
            },
        });
        await setAuthedUserCookie(user.id, user.username);
        // console.log(`Registered new user, id = ${user.id}`);
    } catch(e) {
        console.error(e);
        throw new Error("User could not be created");
    }

}