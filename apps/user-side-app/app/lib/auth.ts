import { prisma } from "@repo/prisma-system/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { rupeesToPaise } from "./Txns_numbers";
export const authOptions = {
    cookies: {
        sessionToken: {
            name: `user-app.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: false, // set true once you're on https
            },
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mobileNumber: { label: "mobileNumber", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {
                console.log("mobile", credentials.mobileNumber);
                console.log("password:", credentials.password)
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        mobileNumber: credentials.mobileNumber
                    }
                });

                if (existingUser) {
                    // existingUser.password will return hash
                    // .compare(plain_psw,hashed_psw)
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.mobileNumber
                        }
                    }
                    return null;
                }
                try {
                    const randomBalance = Math.floor(Math.random() * 10001);
                    // IN DB we will store the entered amount in paise not in ruppess 
                    const amount = rupeesToPaise(randomBalance)
                    const user = await prisma.user.create({
                        data: {
                            mobileNumber: credentials.mobileNumber,
                            password: hashedPassword,
                            Balance: {
                                create: {
                                    amount: amount,
                                    locked: 0
                                }
                            }
                        }
                    });

                    return {
                        id: user.id.toString(),
                        mobileNumber: user.mobileNumber
                    }
                } catch (e) {
                    console.error(e);
                }

                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    pages: {
        signIn: "/signin-signup",
    },
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
}
