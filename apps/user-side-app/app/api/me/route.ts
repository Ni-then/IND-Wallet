import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@repo/prisma-system/client";
import { authOptions } from "../../lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(session.user.id),
            },
            select: {
                mobileNumber: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            mobileNumber: user.mobileNumber,
        });
    } catch (error) {
        console.error("GET /api/me error:", error);

        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}