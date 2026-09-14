import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

// import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { BalanceCard } from "../../../components/BalanceCard";
import { authOptions } from "../../lib/auth";
import QuickActions from "../../../components/QuickActions";
// import RecentTransactions from "../../../components/RecentTransactions";
// import SecurityCard from "../../../components/SecuityCard";
import { getDashboardData } from "../../lib/action/dashboard";
import Txns from "../../../components/Txns";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/signin");
    }

    const data = await getDashboardData();

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="mx-auto flex min-h-screen max-w-[1600px]">


                {/* Main */}
                <main className="min-w-0 flex-1 pb-24 lg:pb-8">

                    <div className="px-4 py-6 sm:px-6 lg:px-8">

                        {/* Balance + Quick actions */}
                        <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

                            <BalanceCard
                                amount={data.balance.amount}
                                locked={data.balance.locked}
                            />

                            <QuickActions />
                        </section>

                        {/* Transactions */}
                        <section className="mt-6 grid gap-6  text-black">

                            <Txns p2pTxns={data.p2pTransactions} onRampTxns ={data.onRampTransactions}/>

                            
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}