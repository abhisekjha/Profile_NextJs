import {getIronSession, SessionOptions} from "iron-session";
import {cookies} from "next/headers";

const sessionOptions: SessionOptions = {
        password: process.env.SECRET_COOKIE_PASSWORD!, //Must be >= 32 chars
        cookieName: "auth", //Choose desired cookie name for session data
        cookieOptions: {
            // secure only works in `https` environments
            // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
            secure: process.env.NODE_ENV === "production",
            //Default ttl of 14 days
        },
};

// Cookie structure interface
export interface SessionData {
    userId?: number;
    username?: string;
    challenge?: string;
    isLoggedIn: boolean;
}

export async function getSession() {
    return await getIronSession<SessionData>(cookies(), sessionOptions);
}