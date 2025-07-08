import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (session && session.user) {
            return NextResponse.json({
                user: session.user
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