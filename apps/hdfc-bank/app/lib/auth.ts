import { prisma } from "@repo/prisma-system/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                userId: {
                    label: "User ID",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            // async authorize(credentials) {
            //     console.log("========== AUTHORIZE ==========");
            //     console.log("credentials:", credentials);

            //     if (!credentials?.userId || !credentials?.password) {
            //         console.log("❌ Missing credentials");
            //         return null;
            //     }

            //     const userId = credentials.userId as string;
            //     const password = credentials.password as string;

            //     const user = await prisma.hdfcAccount.findUnique({
            //         where: {
            //             userId,
            //         },
            //     });

            //     console.log("HDFC USER:", user);

            //     if (!user) {
            //         console.log("❌ HDFC account not found");
            //         return null;
            //     }

            //     const isValidPassword = await bcrypt.compare(
            //         password,
            //         user.password
            //     );

            //     console.log("PASSWORD VALID:", isValidPassword);

            //     if (!isValidPassword) {
            //         console.log("❌ Wrong password");
            //         return null;
            //     }

            //     console.log("✅ LOGIN SUCCESS");

            //     return {
            //         id: String(user.id),
            //         name: user.userId,
            //     };
            // },
            async authorize(credentials) {
                if (!credentials?.userId || !credentials?.password) {
                    return null;
                }

                const userId = credentials.userId as string;
                const password = credentials.password as string;

                console.log("Login User ID:", userId);
                console.log("Login Password:", password);

                const user = await prisma.hdfcAccount.findUnique({
                    where: {
                        userId: userId,
                    },
                });

                console.log("Found User:", user);

                if (!user) {
                    console.log("❌ User not found");
                    return null;
                }

                // Plain-text password comparison
                if (password !== user.password) {
                    console.log("❌ Wrong password");
                    return null;
                }

                console.log("✅ Login successful");

                return {
                    id: String(user.id),
                    name: user.userId,
                };
            }
        }),
    ],

    secret: process.env.JWT_SECRET || "secret",

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
    },
};