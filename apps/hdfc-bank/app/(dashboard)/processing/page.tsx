"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HdfcNavbar from "@/components/HdfcNavbar";

export default function Processing() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const amount = searchParams.get("amount");
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:3001/api/payment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount,
                        token,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Payment failed");
            }

            setSuccess(true);

            setTimeout(() => {
                router.push(
                    `http://localhost:3000/transfer/success?amount=${amount}`
                );
            }, 2000);

        } catch (error) {
            console.error(error);
            alert("Payment failed");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-10 rounded-xl shadow-lg text-center">

                    <div className="text-6xl mb-5">
                        ✅
                    </div>

                    <h1 className="text-2xl font-bold text-green-600">
                        Payment Successful
                    </h1>

                    <p className="text-gray-500 mt-3">
                        ₹{amount} has been added to your IND Wallet
                    </p>

                </div>
            </div>
        );
    }

    return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center ">
    <HdfcNavbar/>

    <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden mt-16">


        {/* Bank Header */}
        <div className="bg-[#004c8f] px-6 py-5 text-white">
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-bold tracking-wide">
                        HDFC BANK
                    </h1>

                    <p className="text-sm text-blue-100 mt-1">
                        NetBanking Payment Gateway
                    </p>
                </div>

                <div className="text-right text-xs text-blue-100">
                    <p>Secure Payment</p>
                    <p>🔒 256-bit Encryption</p>
                </div>

            </div>
        </div>

        <div className="p-7">

            {/* Page Heading */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Confirm your payment
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    You are about to make a payment from your HDFC Bank
                    account.
                </p>
            </div>

            {/* Transaction Details */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">

                <div className="bg-gray-50 px-5 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-700">
                        Transaction Details
                    </p>
                </div>

                <div className="p-5 space-y-4">

                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                            Payment To
                        </span>

                        <span className="text-sm font-medium text-gray-800">
                            IND Wallet
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                            Payment Method
                        </span>

                        <span className="text-sm font-medium text-gray-800">
                            HDFC NetBanking
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                            Transaction ID
                        </span>

                        <span className="text-sm font-mono text-gray-700">
                            {token}
                        </span>
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">

                        <span className="font-semibold text-gray-700">
                            Total Amount
                        </span>

                        <span className="text-2xl font-bold text-gray-900">
                            ₹{amount}
                        </span>

                    </div>

                </div>
            </div>

            {/* Information */}
            {!loading && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">

                    <p className="text-sm font-medium text-blue-900 mb-2">
                        Before you continue
                    </p>

                    <ul className="text-xs text-blue-800 space-y-1.5">
                        <li>• Please verify the transaction amount.</li>
                        <li>• Make sure you have sufficient account balance.</li>
                        <li>• Do not refresh or close this window during payment.</li>
                        <li>• Your payment will be securely processed by HDFC Bank.</li>
                    </ul>

                </div>
            )}

            {/* Processing State */}
            {loading ? (

                <div className="border border-gray-200 rounded-lg p-7 text-center">

                    <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />

                    <h2 className="text-lg font-semibold text-gray-800">
                        Your payment is being processed
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Please wait while we securely process your transaction.
                    </p>

                    <p className="text-xs text-gray-400 mt-4">
                        Do not press the back button or close this window.
                    </p>

                </div>

            ) : (

                <button
                    onClick={handlePayment}
                    className="w-full bg-[#004c8f] hover:bg-[#003b70] text-white py-3.5 rounded-md font-semibold transition"
                >
                    Confirm & Pay ₹{amount}
                </button>

            )}


        </div>

    </div>

</div>


    );
}