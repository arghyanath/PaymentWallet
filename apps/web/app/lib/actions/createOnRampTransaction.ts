"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client"
export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();
    if (!userId) {
        return {
            message: "user not logged in"
        }
    }

    await db.onRampTransactions.create({
        data: {
            userId: Number(userId),
            amount,
            status: 'Processing',
            startTime: new Date(),
            token,
            provider

        }
    })

    return {
        message: "on ramp transaction added"
    }


}