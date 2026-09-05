
"use client";

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    Wallet,
    Send,
    Store,
    Check,
} from "lucide-react";

export default function GetStartWithIndWallet() {
    return (
        <main className="min-h-screen bg-white text-black">

            {/* Navbar */}
            <nav className="border-b border-black/10 bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white">
                            IN
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            IND<span className="text-black/40"> Wallet</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">

                        <Link
                            href="/"
                            className="rounded-xl px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-slate-100 hover:text-black"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/"
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Get started
                        </Link>

                    </div>

                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden bg-white">

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

                    {/* Hero Content */}
                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-3 py-1.5 text-xs font-medium text-black/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                            Simple. Secure. Digital.
                        </div>

                        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Your money,
                            <br />
                            <span className="text-black/40">
                                your way.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-black/50 sm:text-lg">
                            IND Wallet is a simple digital wallet built to make
                            sending, receiving and managing your money easier —
                            all from one place.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link
                                href="/"
                                className="group flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Create your wallet

                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>

                            <Link
                                href="/api/auth/signin"
                                className="flex items-center justify-center rounded-xl border border-black/10 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-50"
                            >
                                Sign in
                            </Link>

                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-black/40">

                            <div className="flex items-center gap-2">
                                <Check size={14} />
                                Easy transfers
                            </div>

                            <div className="flex items-center gap-2">
                                <Check size={14} />
                                Secure wallet
                            </div>

                            <div className="flex items-center gap-2">
                                <Check size={14} />
                                Simple payments
                            </div>

                        </div>

                    </div>

                    {/* Wallet Preview */}
                    <div className="relative mx-auto w-full max-w-md lg:ml-auto">

                        <div className="absolute -inset-10 rounded-full bg-slate-900/[0.04] blur-3xl" />

                        <div className="relative rounded-3xl bg-slate-900 p-6 text-white shadow-2xl sm:p-7">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-medium text-white/50">
                                        IND Wallet
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        Available balance
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-900">
                                    IN
                                </div>

                            </div>

                            <p className="mt-8 text-4xl font-bold tracking-tight">
                                ₹24,850.00
                            </p>

                            <div className="mt-7 grid grid-cols-3 gap-2">

                                <div className="rounded-xl bg-white p-3 text-slate-900">
                                    <ArrowUpRight size={17} />

                                    <p className="mt-5 text-xs font-semibold">
                                        Send
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-3 text-slate-900">
                                    <Wallet size={17} />

                                    <p className="mt-5 text-xs font-semibold">
                                        Add
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-3 text-slate-900">
                                    <Store size={17} />

                                    <p className="mt-5 text-xs font-semibold">
                                        Pay
                                    </p>
                                </div>

                            </div>

                            <div className="mt-7 border-t border-white/10 pt-5">

                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-semibold">
                                        Recent activity
                                    </p>

                                    <p className="text-xs text-white/40">
                                        View all
                                    </p>

                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900">
                                            <Send size={14} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold">
                                                P2P Transfer
                                            </p>

                                            <p className="text-[11px] text-white/40">
                                                Today, 2:30 PM
                                            </p>
                                        </div>

                                    </div>

                                    <p className="text-xs font-bold">
                                        - ₹500
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Features */}
            <section className="border-t border-black/10 bg-slate-50">

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="max-w-xl">

                        <p className="text-xs font-semibold uppercase tracking-widest text-black/40">
                            Everything in one place
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Built around your money.
                        </h2>

                        <p className="mt-4 leading-7 text-black/40">
                            From everyday transfers to merchant payments,
                            keep your wallet simple and organized.
                        </p>

                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        <FeatureCard
                            icon={Send}
                            title="P2P Transfers"
                            description="Send money instantly to other IND Wallet users."
                        />

                        <FeatureCard
                            icon={Store}
                            title="Merchant Payments"
                            description="Pay merchants directly from your wallet."
                        />

                        <FeatureCard
                            icon={Wallet}
                            title="Wallet Management"
                            description="Add money, track your balance and manage transactions."
                        />

                    </div>

                </div>

            </section>

            {/* Security */}
            <section className="border-t border-black/10 bg-white">

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                    <div className="grid gap-8 rounded-3xl bg-slate-900 p-6 text-white sm:p-8 lg:grid-cols-2 lg:p-12">

                        <div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900">
                                <ShieldCheck size={21} />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold">
                                Your wallet. Your control.
                            </h2>

                            <p className="mt-3 max-w-lg leading-7 text-white/50">
                                IND Wallet keeps your payments organized while
                                giving you a clear view of your balance and
                                transaction activity.
                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <SecurityCard
                                icon={Zap}
                                title="Fast"
                                description="Quick and simple payments"
                            />

                            <SecurityCard
                                icon={ShieldCheck}
                                title="Secure"
                                description="Designed with security in mind"
                            />

                            <SecurityCard
                                icon={Wallet}
                                title="Simple"
                                description="Everything in one wallet"
                            />

                            <SecurityCard
                                icon={ArrowUpRight}
                                title="Flexible"
                                description="Send and receive with ease"
                            />

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="border-t border-black/10 bg-white">

                <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">

                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        Ready to get started?
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg leading-7 text-black/40">
                        Create your IND Wallet and start managing your money
                        from one simple place.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Create your wallet
                        <ArrowRight size={17} />
                    </Link>

                </div>

            </section>

            {/* Footer */}
            <footer className="border-t border-black/10 bg-white">

                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-xs text-black/30 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

                    <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-black text-white">
                            IN
                        </div>

                        <span>
                            © 2026 IND Wallet
                        </span>

                    </div>

                    <p>
                        Simple digital wallet experience.
                    </p>

                </div>

            </footer>

        </main>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Icon size={20} />
            </div>

            <h3 className="mt-6 font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-black/40">
                {description}
            </p>

        </div>
    );
}

function SecurityCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">

            <Icon size={20} />

            <p className="mt-5 font-semibold">
                {title}
            </p>

            <p className="mt-1 text-xs leading-5 text-white/40">
                {description}
            </p>

        </div>
    );
}

