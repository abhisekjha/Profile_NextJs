'use server';

import {getSession} from '@/lib/web3/verifyWallet/session';
import {getAuthedUserId} from '@/lib/webauthn/browser/cookieStorage'
import {generateChallenge} from "@/lib/sessionUtil";
import {verifyMessage} from "viem";

export async function startAccountVerification(account: string): Promise<string> {
    const session = await getSession();
    const uid = await getAuthedUserId();
    if(uid === null) throw new Error("User is unauthenticated");
    session.destroy();
    session.userId = uid;
    session.account = account;
    session.challenge = generateChallenge();
    await session.save();
    return session.challenge;
}

type Hex = `0x${string}`;

export async function verifySignature(signature: string): Promise<boolean> {
    const session = await getSession();
    if (!session) throw new Error("Signature verification failed");
    const isValid = await verifyMessage({
        address: session.account as Hex,
        message: session.challenge,
        signature: signature as Hex,
    });


    return isValid;
}