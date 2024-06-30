'use server';

import { getSession } from "@/lib/webauthn/sessionConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setChallengeCookie(challenge: string) {
    const session = await getSession();
    session.destroy();
    session.challenge = challenge;
    await session.save();
}

export async function getChallengeCookie() {
    const session = await getSession();
    const challenge = session.challenge;
    session.destroy(); //Make sure to delete the challenge so it can't be reused, even if verification fails, to prevent replay attacks!
    return challenge;
}

export async function setAuthedUserCookie(userId: number, username: string) {
    const session = await getSession();
    session.userId = userId;
    session.username = username;
    await session.save();
    redirect("/"); //Redirect to home page after successful login
}

export async function getAuthedUsername(): Promise<string | null> {
    const session = await getSession();
    return session.username ? session.username : null;
}

export async function getAuthedUserId(): Promise<number | null> {
    const session = await getSession();
    return session.userId ? session.userId : null;
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return !!session.userId;
}

//Clear cookies and revalidate to reset auth session
export async function clearSession() {
    getSession().then((a) => a.destroy());
    revalidatePath("/");
    redirect("/");
}
