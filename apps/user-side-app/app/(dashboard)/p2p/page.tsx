
"use client";

import React, { useState } from "react";
import { P2pTxns } from "../../lib/action/p2pTxns";
import { toast } from "sonner";

const P2P = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [amount, setAmount] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleTransfer(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Basic validation
        if (!mobileNumber.trim()) {
            toast.error("Receiver User ID is required");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            // Amount is converted to paise
            const amountInPaise = Math.round(Number(amount) * 100);

            await P2pTxns(mobileNumber, amountInPaise);

            toast.success("Transfer successful", {
                description: `₹${ Number(amount).toLocaleString("en-IN") } has been sent successfully.`,
            });

            // Clear form after successful transfer
            setMobileNumber("");
            setAmount("");
        } catch (error) {
            console.error("P2P transfer failed:", error);

            toast.error("Transfer failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Send Money Card */}
            <div className="mx-auto mt-11 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Send Money
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Send money to another IND Wallet user.
                    </p>
                </div>

                <form onSubmit={handleTransfer} className="space-y-5">
                    {/* User ID */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Receiver User ID
                        </label>

                        <input
                            type="number"
                            value={mobileNumber}
                            onChange={(e) =>
                                setMobileNumber(e.target.value)
                            }
                            placeholder="Enter User ID"
                            disabled={loading}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Amount
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                ₹
                            </span>

                            <input
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {loading ? (
                            <>
                                {/* Spinner */}
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                <span>Sending...</span>
                            </>
                        ) : (
                            "Send Money"
                        )}
                    </button>
                </form>
            </div>

            {/* Safety Section */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        !
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            P2P Transfer Safety
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                            Please review the following instructions before
                            sending money.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ✓ Verify User ID
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Always double-check the receiver's User ID before
                            confirming the transfer.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ✓ Check Amount
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Make sure the amount is correct before sending.
                            Transfers cannot be reversed automatically.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ⚠ Avoid Fraud
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Never send money to someone asking for payment
                            through suspicious links or messages.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ⚠ Never Share Password
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            IND Wallet will never ask you to share your password
                            or authentication details.
                        </p>
                    </div>
                </div>

                <div className="mt-4 border-t border-blue-100 pt-4">
                    <p className="text-xs leading-5 text-slate-500">
                        <span className="font-semibold text-slate-700">
                            Important:
                        </span>{" "}
                        P2P transfers are initiated by you. Always verify the
                        receiver details before confirming a transaction.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default P2P