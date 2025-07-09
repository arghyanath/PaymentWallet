import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { useBalanceStore } from "@repo/store/balanceStore"
const balance = useBalanceStore.getState().balance
export async function GET() {

    try {
        const session = await getServerSession(authOptions)
        if (session && session.user) {
            return NextResponse.json({
                user: session.user,
                balance
            })
        }
    }
    catch (e) {
        return NextResponse.json({
            message: "Invalid"
        }, {
            status: 403
        })
    }
    return NextResponse.json({
        message: "Invalid"
    }, {
        status: 403
    })
}
