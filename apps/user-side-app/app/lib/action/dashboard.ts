import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/prisma-system/client";

export type DashboardOnRampTransaction = {
    id: number;
    amount: number;
    status: "Success" | "Failure" | "Processing";
    provider: string;
    time: string;
};

export type DashboardP2PTransaction = {
    id: number;
    amount: number;
    time: string;
    fromUserId: number;
    toUserId: number;
    fromMobile: string;
    toMobile: string;
    type: "sent" | "received";
};

export type DashboardData = {
    user: {
        id: number;
        mobileNumber: string;
    };

    balance: {
        amount: number;
        locked: number;
    };

    onRampTransactions: DashboardOnRampTransaction[];

    p2pTransactions: DashboardP2PTransaction[];
};

export async function getDashboardData(): Promise<DashboardData> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const userId = Number(session.user.id);

    const [user, balance, onRampTransactions, p2pTransactions] =
        await Promise.all([

            prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    mobileNumber: true,
                },
            }),


            prisma.balance.findUnique({
                where: {
                    userId,
                },
                select: {
                    amount: true,
                    locked: true,
                },
            }),


            prisma.onRampTransaction.findMany({
                where: { userId },
                orderBy: { startTime: "desc" },
                take: 10,
                select: {
                    id: true,
                    amount: true,
                    status: true,
                    provider: true,
                    startTime: true,
                },
            }),

            prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId },
            ],
        },
        orderBy: { timestamp: "desc" },
        take: 10,
        select: {
            id: true,
            amount: true,
            timestamp: true,
            fromUserId: true,
            toUserId: true,
            fromUser: {
                select: { mobileNumber: true },
            },
            toUser: {
                select: { mobileNumber: true },
            },
        },
    })
        ]);

    return {

        user: {
            id: user?.id ?? userId,
            mobileNumber: user?.mobileNumber ?? "",
        },


        balance: {
            amount: balance?.amount ?? 0,
            locked: balance?.locked ?? 0,
        },


        onRampTransactions: onRampTransactions.map((txn) => ({
            id: txn.id,
            amount: txn.amount,


            status:
                txn.status === "Success"
                    ? "Success"
                    : txn.status === "Failure"
                        ? "Failure"
                        : "Processing",

            provider: txn.provider,
            time: txn.startTime.toISOString(),
        })),

        // ---------------- P2P ----------------
        p2pTransactions: p2pTransactions.map((txn) => ({
            id: txn.id,
            amount: txn.amount,
            time: txn.timestamp.toISOString(),

            fromUserId: txn.fromUserId,
            toUserId: txn.toUserId,

            fromMobile: txn.fromUser.mobileNumber,
            toMobile: txn.toUser.mobileNumber,

            type:
                txn.fromUserId === userId
                    ? "sent"
                    : "received",
        })),
    };
}