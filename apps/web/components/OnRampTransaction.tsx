import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: "Success" | "Failure" | "Processing",
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div key={Math.random()} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.status === 'Success' && "Received INR"}
                        {t.status === 'Failure' && "Failed Transaction"}
                        {t.status === 'Processing' && "Processing Transaction"}

                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.status === 'Success' && "+"} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}