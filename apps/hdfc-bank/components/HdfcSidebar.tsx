"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    WalletCards,
    ArrowLeftRight,
    History,
    UserPlus,
    Settings,
    LogOut,
    X,
} from "lucide-react";

interface HdfcSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Accounts",
        href: "/accounts",
        icon: WalletCards,
    },
    {
        title: "Fund Transfer",
        href: "/transfer",
        icon: ArrowLeftRight,
    },
    {
        title: "Transactions",
        href: "/transactions",
        icon: History,
    },
    {
        title: "Open New Account",
        href: "/create-account",
        icon: UserPlus,
    },
];

export default function HdfcSidebar({
    isOpen,
    onClose,
}: HdfcSidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed
                    left-0
                    top-[73px]
                    z-50
                    h-[calc(100vh-73px)]
                    w-[280px]
                    bg-[#f5f5f5]
                    shadow-xl
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    lg:shadow-none
                    lg:border-r
                    lg:border-gray-300
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between bg-[#004b8d] px-5 py-4 text-white">

                    <div>
                        <p className="text-sm font-semibold">
                            HDFC BANK
                        </p>

                        <p className="text-xs text-blue-100">
                            Internet Banking
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="lg:hidden"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="py-2">
                    <p className="border-b border-gray-300 bg-gray-200 px-5 py-3 text-xs font-semibold text-gray-500">
                        BANKING SERVICES
                    </p>

                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={onClose}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    border-b
                                    border-gray-200
                                    px-5
                                    py-4
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-white
                                    hover:text-[#004b8d]
                                    hover:border-l-4
                                    hover:border-l-[#ed1c24]
                                "
                            >
                                <Icon
                                    size={19}
                                    className="text-[#004b8d]"
                                />

                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="absolute bottom-0 w-full border-t border-gray-300 bg-white p-3">

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-3 text-sm text-gray-600"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>

                    <button
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-3
                            py-3
                            text-sm
                            font-medium
                            text-[#ed1c24]
                        "
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}