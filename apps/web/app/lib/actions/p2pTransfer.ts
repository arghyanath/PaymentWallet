"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session.user.id;

    if (!from) {
        return {
            message: "User  not found"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User  not found"
        }
    }
    await prisma.$transaction(async (tsx) => {
        await tsx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"= ${Number(from)} FOR UPDATE`
        const fromBalace = await tsx.balance.findUnique({
            where: { userId: Number(from) }
        })

        if (!fromBalace || fromBalace.amount < amount) {
            throw new Error("Insufficient funds")
        }

        await tsx.balance.update({
            where: {
                userId: Number(from)
            },
            data: { amount: { decrement: amount } }
        })
        await tsx.balance.update({
            where: {
                userId: Number(toUser.id)
            },
            data: { amount: { increment: amount } }
        })
        await tsx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: Number(toUser.id),
                amount,
                timestamp: new Date()
            }
        })
    })

}