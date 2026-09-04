"use client";

import { Menu, Bell, LogOut } from "lucide-react";

interface HdfcNavbarProps {
    onMenuClick: () => void;
}

export default function HdfcNavbar({
    onMenuClick,
}: HdfcNavbarProps) {
    return (
        <>
            {/* Top Red Strip */}
            <div className="fixed top-0 z-[60] h-1 w-full bg-[#ed1c24]" />

            <header className="fixed top-1 z-50 h-[72px] w-full bg-white shadow-md">
                <div className="flex h-full items-center justify-between px-4 md:px-6">

                    {/* Left */}
                    <div className="flex items-center gap-3">

                        {/* Mobile Menu */}
                        <button
                            onClick={onMenuClick}
                            className="flex h-10 w-10 items-center justify-center border border-gray-200 text-[#004b8d] lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <div className="leading-none">
                                <div className="text-2xl font-bold tracking-tight text-[#004b8d]">
                                    HDFC
                                </div>

                                <div className="mt-1 h-[2px] w-full bg-[#ed1c24]" />
                            </div>

                            <div className="hidden h-9 w-px bg-gray-300 sm:block" />

                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-[#004b8d]">
                                    HDFC BANK
                                </p>

                                <p className="text-[11px] text-gray-500">
                                    Digital Banking
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">

                        <div className="hidden text-right md:block">
                            <p className="text-xs text-gray-500">
                                Welcome to
                            </p>

                            <p className="text-sm font-semibold text-[#004b8d]">
                                HDFC NetBanking
                            </p>
                        </div>

                        <button className="relative flex h-10 w-10 items-center justify-center text-[#004b8d] hover:bg-gray-100">
                            <Bell size={20} />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ed1c24]" />
                        </button>

                        <button className="hidden items-center gap-2 border-l border-gray-200 pl-4 text-sm font-medium text-[#004b8d] md:flex">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}