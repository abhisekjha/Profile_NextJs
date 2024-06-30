import crypto from "node:crypto";

//Clean for URL safe format
export function clean(str: string) {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

//Server generates challenge for client to sign

export function generateChallenge(): string {
    return clean(crypto.randomBytes(32).toString("base64"));
}