"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarItem from "../../components/SidebarItem";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-slate-900 px-4 text-white shadow-md">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 hover:bg-blue-900 md:hidden"
                    >
                        <MenuIcon />
                    </button>


                    <Link
                        href="/dashboard"
                        className="text-xl font-bold tracking-wide md:text-2xl"
                    >
                        IND <span className="text-blue-300">Wallet</span>
                    </Link>
                </div>


                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium">Welcome back</p>
                        <p className="text-xs text-gray-300">IND Wallet</p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold">
                        U
                    </div>
                </div>
            </nav>

            <div className="flex pt-16">


                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}


                <aside
                    className={`
            fixed left-0 top-16 z-40 h-[calc(100vh-4rem)]
            w-64 bg-slate-900 text-white shadow-xl
            transition-transform duration-300
            md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
                >
                    <div className="flex h-full flex-col">


                        <div className="flex-1 px-3 py-4">
                            <SidebarItem
                                href="/dashboard"
                                title="Dashboard"
                                icon={<HomeIcon />}
                            />

                            <SidebarItem
                                href="/transfer"
                                title="Transfer"
                                icon={<TransferIcon />}
                            />

                            <SidebarItem
                                href="/transactions"
                                title="Transactions"
                                icon={<TransactionsIcon />}
                            />
                        </div>

                        {/* Bottom */}
                        <div className="border-t border-blue-900 p-4">
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm hover:bg-blue-900">
                                <LogoutIcon />
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="min-h-[calc(100vh-4rem)] w-full md:ml-64">
                    {children}
                </main>
            </div>
        </div>
    );
}




function MenuIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
            />
        </svg>
    );
}


function HomeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
            />
        </svg>
    );
}


function TransferIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
        </svg>
    );
}


function TransactionsIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
}


function LogoutIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3H9.75m9 0-3-3m3 3-3 3"
            />
        </svg>
    );
}