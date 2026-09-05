"use client";

import {
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Store,
    History,
    Wallet,
    Plus,
    CreditCard,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const shortcuts = [
    {
        title: "Transfer",
        description: "Send money to bank",
        icon: ArrowUpRight,
        href: "/transfer",
    },
    {
        title: "P2P Transfer",
        description: "Send to another user",
        icon: Send,
        href: "/p2p",
    },
    {
        title: "Merchant",
        description: "Pay at merchant",
        icon: Store,
        href: "/merchant",
    },
    {
        title: "Transactions",
        description: "View payment history",
        icon: History,
        href: "/transactions",
    },
];

const transactions = [
    {
        name: "Rahul Sharma",
        type: "P2P Transfer",
        amount: "- ₹500",
        date: "Today, 2:30 PM",
        sent: true,
    },
    {
        name: "Added Money",
        type: "Wallet Top-up",
        amount: "+ ₹2,000",
        date: "Today, 11:20 AM",
        sent: false,
    },
    {
        name: "Amazon",
        type: "Merchant Payment",
        amount: "- ₹799",
        date: "Yesterday",
        sent: true,
    },
];

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <nav className="border-b border-white/10">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-900">
                            IN
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            IND<span className="text-white/50"> Wallet</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="hidden rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 sm:block">
                            Help
                        </button>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900">
                            NB
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

                {/* Welcome */}
                <div className="mb-8">
                    <p className="text-sm text-white/50">
                        Welcome back
                    </p>

                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                        Your Wallet
                    </h1>
                </div>

                {/* Top Section */}
                <div className="grid gap-5 lg:grid-cols-3">

                    {/* Balance Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white p-6 text-slate-900 lg:col-span-2">

                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-200" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                                        <Wallet size={18} />
                                    </div>

                                    <span className="text-sm font-medium text-slate-500">
                                        Available Balance
                                    </span>
                                </div>

                                <button className="rounded-lg p-2 transition hover:bg-slate-100">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <div className="mt-8">
                                <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    ₹24,850.00
                                </p>

                                <p className="mt-2 text-sm text-slate-500">
                                    Your current wallet balance
                                </p>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <Link
                                    href="/add-money"
                                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    <Plus size={17} />
                                    Add Money
                                </Link>

                                <Link
                                    href="/transfer"
                                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition hover:bg-slate-100"
                                >
                                    <ArrowUpRight size={17} />
                                    Send Money
                                </Link>

                            </div>
                        </div>
                    </div>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/50">
                                    Money Added
                                </span>

                                <ArrowDownLeft
                                    size={18}
                                    className="text-white/70"
                                />
                            </div>

                            <p className="mt-4 text-2xl font-bold">
                                ₹8,500
                            </p>

                            <p className="mt-1 text-xs text-white/40">
                                This month
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/50">
                                    Money Spent
                                </span>

                                <ArrowUpRight
                                    size={18}
                                    className="text-white/70"
                                />
                            </div>

                            <p className="mt-4 text-2xl font-bold">
                                ₹4,230
                            </p>

                            <p className="mt-1 text-xs text-white/40">
                                This month
                            </p>
                        </div>

                    </div>
                </div>

                {/* Shortcuts */}
                <section className="mt-10">

                    <div className="mb-4 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                Quick actions
                            </p>

                            <h2 className="mt-1 text-xl font-bold">
                                Shortcuts
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                        {shortcuts.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 sm:p-5"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 transition group-hover:scale-105">
                                        <Icon size={20} />
                                    </div>

                                    <h3 className="mt-5 font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-white/40">
                                        {item.description}
                                    </p>
                                </Link>
                            );
                        })}

                    </div>
                </section>

                {/* Transactions */}
                <section className="mt-10">

                    <div className="mb-4 flex items-center justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                Activity
                            </p>

                            <h2 className="mt-1 text-xl font-bold">
                                Recent Transactions
                            </h2>
                        </div>

                        <Link
                            href="/transactions"
                            className="text-sm font-medium text-white/60 transition hover:text-white"
                        >
                            View all
                        </Link>

                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/10">

                        {transactions.map((transaction, index) => (

                            <div
                                key={transaction.name + index}
                                className="flex items-center justify-between border-b border-white/10 p-4 last:border-0 sm:p-5"
                            >

                                <div className="flex min-w-0 items-center gap-3">

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${transaction.sent
                                                ? "bg-white/10"
                                                : "bg-white"
                                            }`}
                                    >
                                        {transaction.sent ? (
                                            <ArrowUpRight
                                                size={18}
                                                className="text-white"
                                            />
                                        ) : (
                                            <ArrowDownLeft
                                                size={18}
                                                className="text-slate-900"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {transaction.name}
                                        </p>

                                        <p className="mt-0.5 text-xs text-white/40">
                                            {transaction.type} · {transaction.date}
                                        </p>
                                    </div>

                                </div>

                                <p
                                    className={`ml-3 shrink-0 text-sm font-semibold ${transaction.sent
                                            ? "text-white"
                                            : "text-white"
                                        }`}
                                >
                                    {transaction.amount}
                                </p>

                            </div>

                        ))}

                    </div>
                </section>

                {/* Bottom cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                    <Link
                        href="/cards"
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                    >
                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900">
                                <CreditCard size={20} />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Manage Payments
                                </p>

                                <p className="mt-1 text-xs text-white/40">
                                    Manage your payment methods
                                </p>
                            </div>

                        </div>

                        <ArrowUpRight size={18} className="text-white/40" />
                    </Link>

                    <Link
                        href="/merchant"
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                    >
                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900">
                                <Store size={20} />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Merchant Payments
                                </p>

                                <p className="mt-1 text-xs text-white/40">
                                    Pay businesses using IND Wallet
                                </p>
                            </div>

                        </div>

                        <ArrowUpRight size={18} className="text-white/40" />
                    </Link>

                </div>

            </div>
        </main>
    );
}