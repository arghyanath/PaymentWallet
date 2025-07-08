import express from "express";
const app = express();

import db from "@repo/db/client"

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInfo.userId
                },
                data: {
                    amount: {
                        increment: paymentInfo.amount
                    }
                }
            }),
            db.onRampTransactions.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.json({
            message: "capture"
        })
    } catch (error) {
        res.status(411).json({
            message: "Error while processing"
        })
    }




})