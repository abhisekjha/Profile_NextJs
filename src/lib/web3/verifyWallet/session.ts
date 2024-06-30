import {getIronSession, SessionOptions} from "iron-session";
import {cookies} from "next/headers";

const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD!, //Must be >= 32 chars
    cookieName: "verification", //Choose desired cookie name for session data
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: process.env.NODE_ENV === "production",
        ttl: 60 //60 seconds
    },
};

// Cookie structure interface
export interface SessionData {
    userId: number;
    account: string;
    challenge: string;
}

export async function getSession() {
    return await getIronSession<SessionData>(cookies(), sessionOptions);
}