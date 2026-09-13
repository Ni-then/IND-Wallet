"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { prisma } from "@repo/prisma-system/client";

export async function P2pTxns(mobileNumber: string, amount: number) {

    try {

        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            throw new Error("User is not authenticated");
        }

        const from = session.user.id;

        const toUser = await prisma.user.findFirst({
            where: {
                mobileNumber: mobileNumber
            }
        });

        if (!toUser) {
            throw new Error("Receiver not found");
        }

        if (Number(from) === toUser.id) {
            throw new Error("You cannot send money to yourself");
        }

        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }

        await prisma.$transaction(async (tx) => {

            // SQL injection can be done ,
            await tx.$queryRaw`
SELECT * FROM "Balance"
                WHERE "userId" = ${ Number(from) }
                FOR UPDATE
    `;

            // now
            // above sleep , after sleep
            // above sleep , after sleep

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            });

            if (!fromBalance) {
                throw new Error("Sender balance not found");
            }

            if (fromBalance.amount < amount) {
                throw new Error("Insufficient balance");
            }

            // above sleep
            // above sleep
            // after sleep
            // POST / p2p 200 in 8.1s(next.js: 6ms, application - code: 8.1s)
            // └─ ƒ P2pTxns("8284811894", 100) in 8098ms app / lib / action / p2pTxns.tsx

            // console.log("above sleep")
            // await new Promise(resolve => setTimeout(resolve, 4000))
            // console.log("after sleep")

            // jo send kr raha hai , uske balance seh deduct
            await tx.balance.update({
                where: {
                    userId: Number(from)
                },
                data: {
                    amount: { decrement: amount }
                }
            });

            // jo recieve kr raha hai , uske balance increase
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: { increment: amount }
                }
            })

            // add p2p entry in the DB
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date()
                }
            })

            // above sleep
            // after sleep
            // POST / p2p 200 in 8.1s(next.js: 6ms, application - code: 8.1s)
            // └─ ƒ P2pTxns("8284811894", 100) in 8098ms app / lib / action / p2pTxns.tsx

        }, {
            timeout: 10000
        });

        return {
            success: true,
            message: "Money transferred successfully"
        };

    } catch (error) {

        console.error("P2P Transaction Error:", error);

        if (error instanceof Error) {
            return {
                success: false,
                message: error.message
            };
        }

        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

