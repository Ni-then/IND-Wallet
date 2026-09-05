"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Lock, Smartphone } from "lucide-react";

export default function SignIn() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            mobileNumber,
            password,
            redirect: false,
        });

        if (result?.ok) {
            window.location.href = "/transfer";
            return;
        }

        setError("Invalid mobile number or password.");
        setLoading(false);
    };

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

                    <Link
                        href="/"
                        className="text-sm font-medium text-black/50 transition hover:text-black"
                    >
                        Back to home
                    </Link>

                </div>
            </nav>

            {/* Login */}
            <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 sm:px-6">

                <div className="w-full max-w-md">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-black text-white shadow-lg">
                            IN
                        </div>

                        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-black/40">
                            Sign in to your IND Wallet
                        </p>

                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Mobile Number */}
                            <div>

                                <label
                                    htmlFor="mobileNumber"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Mobile number
                                </label>

                                <div className="relative">

                                    <Smartphone
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                                    />

                                    <input
                                        id="mobileNumber"
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        placeholder="Enter your mobile number"
                                        value={mobileNumber}
                                        onChange={(e) =>
                                            setMobileNumber(
                                                e.target.value.replace(/\D/g, "")
                                            )
                                        }
                                        required
                                        className="w-full rounded-xl border border-black/10 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                                    />

                                </div>

                            </div>

                            {/* Password */}
                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                                    />

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-xl border border-black/10 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                                    />

                                </div>

                            </div>

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}

                                {!loading && (
                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                )}
                            </button>

                        </form>

                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-black/40">
                        Don't have an IND Wallet?{" "}
                        <Link
                            href="/api/auth/signin?callbackUrl=/transfer"
                            className="font-semibold text-slate-900 hover:underline"
                        >
                            Create one
                        </Link>
                    </p>

                    <p className="mt-8 text-center text-xs text-black/30">
                        Your wallet. Your control.
                    </p>

                </div>

            </section>

        </main>
    );
}