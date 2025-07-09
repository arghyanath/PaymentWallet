import express from "express";
const app = express();

import db from "@repo/db/client"

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //check status is processesing
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    console.log(paymentInfo);

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
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
        console.log(error);

        res.status(411).json({
            message: "Error while processing"
        })
    }




})

app.listen(3001, () => {
    console.log("server stared")
})