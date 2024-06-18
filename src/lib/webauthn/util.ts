'use server';
import crypto from "node:crypto";

//Clean for URL safe format
export async function clean(str: string) {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

//Server generates challenge for client to sign

export async function generateChallenge() {
    return clean(crypto.randomBytes(32).toString("base64"));
}