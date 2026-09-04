import { authOptions } from "@/app/lib/auth";
import { prisma } from "@repo/prisma-system/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    const userId = session?.user?.name;
    console.log("userId is here : ",userId)
    if(!userId){
        return NextResponse.json(
            { message: "Unauthorized" },
            {
                status: 401,
                headers: corsHeaders,
            }
        );
    }
    try {
        const body = await req.json();

        const { token } = body;

        if (!token ) {
            return NextResponse.json(
                { message: "Token is required" },
                {
                    status: 400,
                    headers: corsHeaders,
                }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            // 1. Find transaction using token
            const transaction = await tx.onRampTransaction.findUnique({
                where: {
                    token,
                },
            });

            if (!transaction) {
                return {
                    status: "not_found" as const,
                };
            }

            // 2. Check transaction status
            if (transaction.status !== "Processing") {
                return {
                    status: "already_processed" as const,
                };
            }

            // IMPORTANT:
            // Amount DB se aa raha hai.
            // Frontend se amount lene ki zarurat nahi hai.
            const amount = transaction.amount;

            // 3. Find HDFC account
            const account = await tx.hdfcAccount.findUnique({
                where: {
                    userId,
                },
            });

            if (!account) {
                throw new Error("HDFC account not found");
            }

            // 4. Check HDFC balance
            if (account.balance < amount) {
                throw new Error("Insufficient HDFC balance");
            }

            // 5. Deduct amount from HDFC account
            const updatedAccount = await tx.hdfcAccount.update({
                where: {
                    id: account.id,
                },
                data: {
                    balance: {
                        decrement: amount,
                    },
                },
            });

            return {
                status: "success" as const,
                transaction,
                amount,
                balance: updatedAccount.balance,
            };
        },
            {
                maxWait: 10000,
                timeout: 10000
            }
    );

        // Transaction not found
        if (result.status === "not_found") {
            return NextResponse.json(
                {
                    message: "Transaction not found",
                },
                {
                    status: 404,
                    headers: corsHeaders,
                }
            );
        }

        // Already processed
        if (result.status === "already_processed") {
            return NextResponse.json(
                {
                    message: "Transaction already processed",
                },
                {
                    status: 409,
                    headers: corsHeaders,
                }
            );
        }

        // Success
        return NextResponse.json(
            {
                message: "Payment captured successfully",
                amount: result.amount,
                balance: result.balance,
                token,
            },
            {
                status: 200,
                headers: corsHeaders,
            }
        );
    } catch (error) {
        console.error("HDFC Payment Error:", error);

        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Error while processing payment",
            },
            {
                status: 500,
                headers: corsHeaders,
            }
        );
    }
}
 