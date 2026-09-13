import TransactionItem from "./TransactionItem";

interface P2PTransaction {
    id: number;
    amount: number;
    time: string;
    type: "sent" | "received";
    fromMobile: string;
    toMobile: string;
}

interface OnRampTransaction {
    id: number;
    amount: number;
    status: string;
    provider: string;
    time: string;
}

interface Props {
    p2pTransactions: P2PTransaction[];
    onRampTransactions: OnRampTransaction[];
}

export default function RecentTransactions({
    p2pTransactions,
    onRampTransactions,
}: Props) {
    const transactions = [
        ...p2pTransactions.map((txn) => ({
            ...txn,
            category: "p2p" as const,
        })),

        ...onRampTransactions.map((txn) => ({
            ...txn,
            category: "onramp" as const,
        })),
    ]
        .sort(
            (a, b) =>
                new Date(b.time).getTime() -
                new Date(a.time).getTime()
        )
        .slice(0, 7);

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">

            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                        Activity
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                        Recent transactions
                    </h3>
                </div>

                <a
                    href="/transactions"
                    className="text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                    View all →
                </a>
            </div>

            {transactions.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                        ₹
                    </div>

                    <p className="mt-4 text-sm font-medium">
                        No transactions yet
                    </p>

                    <p className="mt-1 max-w-xs text-xs text-slate-500">
                        Your wallet activity will appear here once you make a transaction.
                    </p>
                </div>
            ) : (
                <div className="space-y-1">
                    {transactions.map((txn) => {
                        if (txn.category === "onramp") {
                            return (
                                <TransactionItem
                                    key={`onramp-${txn.id}`}
                                    type="onramp"
                                    amount={txn.amount}
                                    title={`Added via ${txn.provider}`}
                                    subtitle={new Date(
                                        txn.time
                                    ).toLocaleDateString("en-IN")}
                                    status={txn.status}
                                    time={new Date(
                                        txn.time
                                    ).toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                />
                            );
                        }

                        return (
                            <TransactionItem
                                key={`p2p-${txn.id}`}
                                type={txn.type}
                                amount={txn.amount}
                                title={
                                    txn.type === "sent"
                                        ? `Sent to ${txn.toMobile}`
                                        : `Received from ${txn.fromMobile}`
                                }
                                subtitle={new Date(
                                    txn.time
                                ).toLocaleDateString("en-IN")}
                                time={new Date(
                                    txn.time
                                ).toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}