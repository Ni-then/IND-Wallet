interface Props {
    type: "sent" | "received" | "onramp";
    amount: number;
    title: string;
    subtitle: string;
    status?: string;
    time: string;
}

function formatINR(amount: number) {
    return `₹${(amount / 100).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

export default function TransactionItem({
    type,
    amount,
    title,
    subtitle,
    status,
    time,
}: Props) {
    const isReceived = type === "received" || type === "onramp";

    return (
        <div className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-white/[0.03]">

            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${isReceived
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
            >
                {type === "onramp"
                    ? "↓"
                    : isReceived
                        ? "↙"
                        : "↗"}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    {title}
                </p>

                <p className="truncate text-xs text-slate-500">
                    {subtitle}
                </p>
            </div>

            <div className="text-right">
                <p
                    className={`text-sm font-semibold ${isReceived
                            ? "text-emerald-400"
                            : "text-white"
                        }`}
                >
                    {isReceived ? "+" : "-"}
                    {formatINR(amount)}
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                    {status || time}
                </p>
            </div>
        </div>
    );
}