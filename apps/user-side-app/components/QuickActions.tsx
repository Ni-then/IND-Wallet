import Link from "next/link";

const actions = [
    {
        title: "Add Money",
        description: "Fund your wallet",
        icon: "+",
        href: "/transfer",
    },
    {
        title: "Send Money",
        description: "Transfer instantly",
        icon: "↗",
        href: "/p2p",
    },
    {
        title: "Transactions",
        description: "View all activity",
        icon: "↻",
        href: "/transactions",
    },
];

export default function QuickActions() {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">

            <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Quick actions
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                    Manage your money
                </h3>
            </div>

            <div className="space-y-3">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className="group flex items-center gap-4 rounded-2xl border bg-white text-black p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg font-semibold text-blue-400 transition group-hover:bg-blue-500 group-hover:text-white">
                            {action.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">
                                {action.title}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                {action.description}
                            </p>
                        </div>

                        <span className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}