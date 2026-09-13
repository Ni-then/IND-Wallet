export default function SecurityCard() {
    return (
        <div className="rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.04] p-5 sm:p-6">

            <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    ✓
                </div>

                <div>
                    <h3 className="text-sm font-semibold">
                        Wallet protected
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your balance and transfers are secured with authenticated wallet access.
                    </p>
                </div>
            </div>

            <div className="mt-5 space-y-2">

                <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                    <span className="text-xs text-slate-500">
                        Authentication
                    </span>

                    <span className="text-xs font-medium text-emerald-400">
                        Active
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                    <span className="text-xs text-slate-500">
                        Transaction protection
                    </span>

                    <span className="text-xs font-medium text-emerald-400">
                        Active
                    </span>
                </div>
            </div>
        </div>
    );
}