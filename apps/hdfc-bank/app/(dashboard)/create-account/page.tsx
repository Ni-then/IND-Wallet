"use client";

import HdfcNavbar from "@/components/HdfcNavbar";
import HdfcSidebar from "@/components/HdfcSidebar";
import { useRouter } from "next/navigation";

import { useState } from "react";
import axios from "axios";

export default function CreateAccountPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [userId, setUserId] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/create-user", {
            userId,
            mobileNumber,
            password,
        })
        setUserId("");
        setMobileNumber("")
        setPassword("")

        router.push("http://localhost:3001/login");
    };

    return (
        <div className="min-h-screen text-black bg-[#f1f3f5]">

            {/* Navbar */}
            <HdfcNavbar
                onMenuClick={() =>
                    setSidebarOpen(true)
                }
            />


            {/* Sidebar */}
            <HdfcSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            {/* Main Content */}
            <main className="pt-[73px] lg:pl-[280px]">

                {/* Breadcrumb */}
                <div className="border-b border-gray-300 bg-white px-4 py-3 sm:px-6">
                    <div className="mx-auto max-w-5xl text-xs text-gray-500">
                        Home
                        <span className="mx-2">/</span>
                        Accounts
                        <span className="mx-2">/</span>

                        <span className="font-medium text-[#004b8d]">
                            Open New Account
                        </span>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:py-10">

                    {/* Page Title */}
                    <div className="mb-6 border-b-2 border-[#004b8d] bg-white p-5 shadow-sm">

                        <h1 className="text-xl font-semibold text-[#004b8d] sm:text-2xl">
                            Open a New Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Please provide the details below to create your
                            HDFC Bank Savings Account.
                        </p>

                    </div>

                    {/* Form */}
                    <div className="bg-white shadow-sm">

                        {/* Blue Form Header */}
                        <div className="border-b-4 border-[#ed1c24] bg-[#004b8d] px-5 py-4 text-white">

                            <h2 className="text-base font-semibold">
                                Account Opening Details
                            </h2>

                            <p className="mt-1 text-xs text-blue-100">
                                All fields marked are required.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-4 sm:p-6 md:p-8"
                        >

                            <div className="space-y-6">

                                {/* Personal Details */}
                                <section>

                                    <div className="mb-5 border-b border-gray-200 pb-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#004b8d]">
                                            Personal Details
                                        </h3>
                                    </div>

                                    {/* userId */}
                                    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-center md:gap-6">

                                        <label
                                            htmlFor="userId"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            userId
                                            <span className="ml-1 text-[#ed1c24]">
                                                *
                                            </span>
                                        </label>

                                        <div>
                                            <input
                                                id="userId"
                                                type="text"
                                                value={userId}
                                                onChange={(e) =>
                                                    setUserId(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter preferred userId"
                                                required
                                                className="
                                                    w-full
                                                    border
                                                    border-gray-300
                                                    bg-white
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    outline-none
                                                    focus:border-[#004b8d]
                                                    focus:ring-1
                                                    focus:ring-[#004b8d]
                                                "
                                            />

                                            <p className="mt-1 text-xs text-gray-500">
                                                This userId will be used to
                                                access your HDFC Bank account.
                                            </p>
                                        </div>
                                    </div>

                                </section>

                                {/* Contact Details */}
                                <section>

                                    <div className="mb-5 border-b border-gray-200 pb-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#004b8d]">
                                            Contact Details
                                        </h3>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-center md:gap-6">

                                        <label
                                            htmlFor="mobile"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Mobile Number
                                            <span className="ml-1 text-[#ed1c24]">
                                                *
                                            </span>
                                        </label>

                                        <div className="flex">

                                            <div className="flex items-center border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-600">
                                                +91
                                            </div>

                                            <input
                                                id="mobile"
                                                type="tel"
                                                value={mobileNumber}
                                                onChange={(e) =>
                                                    setMobileNumber(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter 10 digit mobile number"
                                                required
                                                maxLength={10}
                                                className="
                                                    w-full
                                                    border
                                                    border-gray-300
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    outline-none
                                                    focus:border-[#004b8d]
                                                    focus:ring-1
                                                    focus:ring-[#004b8d]
                                                "
                                            />

                                        </div>
                                    </div>

                                </section>

                                {/* Security Details */}
                                <section>

                                    <div className="mb-5 border-b border-gray-200 pb-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#004b8d]">
                                            Security Details
                                        </h3>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-center md:gap-6">

                                        <label
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Create Password
                                            <span className="ml-1 text-[#ed1c24]">
                                                *
                                            </span>
                                        </label>

                                        <div>

                                            <input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter secure password"
                                                required
                                                className="
                                                    w-full
                                                    border
                                                    border-gray-300
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    outline-none
                                                    focus:border-[#004b8d]
                                                    focus:ring-1
                                                    focus:ring-[#004b8d]
                                                "
                                            />

                                            <p className="mt-2 text-xs text-gray-500">
                                                Use a strong password containing
                                                letters and numbers.
                                            </p>

                                        </div>
                                    </div>

                                </section>

                                {/* Account Type */}
                                <section>

                                    <div className="mb-5 border-b border-gray-200 pb-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#004b8d]">
                                            Account Details
                                        </h3>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:items-center md:gap-6">

                                        <label className="text-sm font-medium text-gray-700">
                                            Account Type
                                        </label>

                                        <div className="border border-[#004b8d] bg-blue-50 px-4 py-4">

                                            <div className="flex items-center justify-between gap-4">

                                                <div>
                                                    <p className="font-semibold text-[#004b8d]">
                                                        Savings Account
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-600">
                                                        Personal savings account
                                                        for secure banking and
                                                        transactions.
                                                    </p>
                                                </div>

                                                <span className="border border-green-600 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                    SELECTED
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                            </div>

                            {/* Actions */}
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row">

                                <button
                                    type="submit"
                                    className="
                                        bg-[#ed1c24]
                                        px-8
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-[#c9151d]
                                    "
                                >
                                    Create Savings Account
                                </button>

                                <button
                                    type="button"
                                    className="
                                        border
                                        border-gray-400
                                        bg-white
                                        px-8
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        hover:bg-gray-100
                                    "
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* Security Footer */}
                    <div className="mt-6 border border-gray-300 bg-white p-4">

                        <p className="text-xs leading-6 text-gray-500">
                            <span className="font-semibold text-[#004b8d]">
                                Secure Banking:
                            </span>{" "}
                            Your information is securely processed. Please do
                            not share your userId or password with anyone.
                        </p>

                    </div>

                </div>
            </main>
        </div>
    );
}