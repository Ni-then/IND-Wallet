"use client";

import React, { useEffect, useRef, useState } from "react";
import { P2pTxns } from "../../lib/action/p2pTxns";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";

const P2P = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [amount, setAmount] = useState("");

    const [loading, setLoading] = useState(false);

    // QR states
    const [showMyQR, setShowMyQR] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [myMobileNumber, setMyMobileNumber] = useState("");

    const scannerRef = useRef<Html5Qrcode | null>(null);

    /*
     * -----------------------------------------
     * GET CURRENT USER MOBILE NUMBER
     * -----------------------------------------
     *
     * For "My QR".
     *
     * IMPORTANT:
     * Create this server action separately.
     */
    useEffect(() => {
        async function loadMyMobileNumber() {
            try {
                const response = await fetch("/api/me");

                if (!response.ok) {
                    throw new Error("Unable to get user details");
                }

                const data = await response.json();

                setMyMobileNumber(data.mobileNumber);
            } catch (error) {
                console.error("Failed to load mobile number:", error);
            }
        }

        loadMyMobileNumber();
    }, []);

    /*
     * -----------------------------------------
     * START QR SCANNER
     * -----------------------------------------
     */
    useEffect(() => {
        if (!showScanner) return;

        let scanner: Html5Qrcode | null = null;

        async function startScanner() {
            try {
                scanner = new Html5Qrcode("qr-reader");
                scannerRef.current = scanner;

                await scanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
                    },
                    async (decodedText) => {
                        console.log("QR detected:", decodedText);

                        // Expected format:
                        // INDWALLET:8284811894

                        if (!decodedText.startsWith("INDWALLET:")) {
                            toast.error("Invalid IND Wallet QR");
                            return;
                        }

                        const scannedMobile = decodedText
                            .replace("INDWALLET:", "")
                            .trim();

                        // Validate mobile number
                        if (!/^\d{10}$/.test(scannedMobile)) {
                            toast.error("Invalid receiver User ID");
                            return;
                        }

                        // Stop scanner
                        try {
                            if (scanner) {
                                await scanner.stop();
                                await scanner.clear();
                            }
                        } catch (error) {
                            console.error(
                                "Failed to stop scanner:",
                                error
                            );
                        }

                        scannerRef.current = null;

                        // Put scanned number into existing P2P state
                        setMobileNumber(scannedMobile);

                        // Close scanner
                        setShowScanner(false);

                        toast.success("Receiver found", {
                            description: `User ID: ${scannedMobile}`,
                        });
                    },
                    (errorMessage) => {
                        // Ignore continuous scanner errors.
                        // html5-qrcode calls this when no QR is detected.
                    }
                );
            } catch (error) {
                console.error("QR scanner error:", error);

                toast.error("Unable to start camera", {
                    description:
                        "Please allow camera permission and try again.",
                });

                setShowScanner(false);
            }
        }

        startScanner();

        // Cleanup when scanner closes/unmounts
        return () => {
            async function cleanupScanner() {
                try {
                    if (scannerRef.current) {
                        await scannerRef.current.stop();
                        await scannerRef.current.clear();
                        scannerRef.current = null;
                    }
                } catch (error) {
                    console.error("Scanner cleanup error:", error);
                }
            }

            cleanupScanner();
        };
    }, [showScanner]);

    /*
     * -----------------------------------------
     * SEND MONEY
     * -----------------------------------------
     */
    async function handleTransfer(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        // Basic validation
        if (!mobileNumber.trim()) {
            toast.error("Receiver User ID is required");
            return;
        }

        if (!/^\d{10}$/.test(mobileNumber)) {
            toast.error("Please enter a valid 10-digit User ID");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            // Convert rupees -> paise
            const amountInPaise = Math.round(Number(amount) * 100);

            const result = await P2pTxns(
                mobileNumber,
                amountInPaise
            );

            /*
             * VERY IMPORTANT:
             *
             * Your server action returns:
             *
             * {
             *   success: false,
             *   message: "..."
             * }
             *
             * instead of throwing.
             *
             * So we MUST check result.success.
             */
            if (!result.success) {
                toast.error("Transfer failed", {
                    description: result.message,
                });

                return;
            }

            toast.success("Transfer successful", {
                description: `₹${Number(amount).toLocaleString(
                    "en-IN"
                )} has been sent successfully.`,
            });

            // Clear form
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
            {/* ----------------------------------------- */}
            {/* SEND MONEY CARD */}
            {/* ----------------------------------------- */}

            <div className="mx-auto mt-11 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Send Money
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Send money to another IND Wallet user.
                    </p>
                </div>

                {/* ----------------------------------------- */}
                {/* QR ACTIONS */}
                {/* ----------------------------------------- */}

                <div className="mb-6 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setShowScanner(true)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="text-lg">▣</span>
                        Scan & Pay
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowMyQR(true)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="text-lg">▦</span>
                        My QR
                    </button>
                </div>

                <form
                    onSubmit={handleTransfer}
                    className="space-y-5"
                >
                    {/* ----------------------------------------- */}
                    {/* RECEIVER USER ID */}
                    {/* ----------------------------------------- */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Receiver User ID
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={mobileNumber}
                                onChange={(e) =>
                                    setMobileNumber(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                placeholder="Enter User ID or scan QR"
                                disabled={loading}
                                maxLength={10}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-24 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />

                            {mobileNumber && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                                    ✓ Found
                                </span>
                            )}
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                            Enter the receiver's User ID or scan their
                            IND Wallet QR.
                        </p>
                    </div>

                    {/* ----------------------------------------- */}
                    {/* AMOUNT */}
                    {/* ----------------------------------------- */}

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
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                                placeholder="Enter amount"
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                    {/* ----------------------------------------- */}
                    {/* SEND BUTTON */}
                    {/* ----------------------------------------- */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {loading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                <span>Sending...</span>
                            </>
                        ) : (
                            "Send Money"
                        )}
                    </button>
                </form>
            </div>

            {/* ----------------------------------------- */}
            {/* SAFETY SECTION */}
            {/* ----------------------------------------- */}

            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                        !
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            P2P Transfer Safety
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                            Please review the following instructions
                            before sending money.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ✓ Verify User ID
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Always double-check the receiver's User ID
                            before confirming the transfer.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ✓ Check Amount
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Make sure the amount is correct before
                            sending.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ⚠ Avoid Fraud
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Never send money through suspicious links or
                            messages.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="font-medium text-slate-900">
                            ⚠ Never Share Password
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            IND Wallet will never ask you to share your
                            password.
                        </p>
                    </div>
                </div>

                <div className="mt-4 border-t border-blue-100 pt-4">
                    <p className="text-xs leading-5 text-slate-500">
                        <span className="font-semibold text-slate-700">
                            Important:
                        </span>{" "}
                        P2P transfers are initiated by you. Always verify
                        the receiver details before confirming a
                        transaction.
                    </p>
                </div>
            </div>

            {/* ----------------------------------------- */}
            {/* MY QR MODAL */}
            {/* ----------------------------------------- */}

            {showMyQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    My IND Wallet QR
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Let someone scan this QR to pay you.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowMyQR(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col items-center">
                            {myMobileNumber ? (
                                <>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <QRCodeSVG
                                            value={`INDWALLET:${myMobileNumber}`}
                                            size={220}
                                            level="H"
                                        />
                                    </div>

                                    <p className="mt-5 text-sm font-medium text-slate-700">
                                        IND Wallet
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {myMobileNumber}
                                    </p>

                                    <p className="mt-2 text-center text-xs text-slate-400">
                                        Scan this QR to automatically
                                        identify this wallet.
                                    </p>
                                </>
                            ) : (
                                <div className="py-10 text-center">
                                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                                    <p className="text-sm text-slate-500">
                                        Loading your QR...
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowMyQR(false)}
                            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* ----------------------------------------- */}
            {/* SCANNER MODAL */}
            {/* ----------------------------------------- */}

            {showScanner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 p-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Scan & Pay
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Scan an IND Wallet QR code.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowScanner(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scanner */}
                        <div className="p-5">
                            <div
                                id="qr-reader"
                                className="overflow-hidden rounded-2xl"
                            />

                            <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center">
                                <p className="text-sm font-medium text-blue-900">
                                    Point your camera at the receiver's
                                    QR code
                                </p>

                                <p className="mt-1 text-xs text-blue-600">
                                    The receiver User ID will be filled
                                    automatically.
                                </p>
                            </div>
                        </div>

                        {/* Close */}
                        <div className="border-t border-slate-100 p-5">
                            <button
                                onClick={() =>
                                    setShowScanner(false)
                                }
                                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default P2P;