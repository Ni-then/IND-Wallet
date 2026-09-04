
import React from "react";
import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { BalanceCard } from "../../../components/BalanceCard";

const Transfer = () => {
  const transactions = [
    {
      time: new Date(),
      amount: 10000,
      status: "pending",
      provider: "HDFC Bank",
    },
  ];

  return (
    <div className=" w-full h-full bg-white py-2 px-6 text-black ">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-xl shadow-lg shadow-blue-500/20">
            ₹
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Transfer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage your wallet balance and transactions
            </p>
          </div>
        </div>
      </div>


      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        
        {/* Add Money */}
        <div className="rounded-2xl   p-5 shadow-xl backdrop-blur md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-lg text-blue-400">
              +
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Add Money
              </h2>

              <p className="text-sm text-slate-400">
                Add funds to your wallet
              </p>
            </div>
          </div>

          <AddMoney />
        </div>


        {/* Balance */}
        <div className="rounded-2xl  p-5 shadow-xl backdrop-blur md:p-6">
          
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg text-emerald-400">
              ₹
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Wallet Balance
              </h2>

              <p className="text-sm text-slate-400">
                Your available funds
              </p>
            </div>
          </div>

          <BalanceCard amount={1000} locked={0} />

          {/* Quick Info */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            
            <div className="rounded-xl border border-slate-700 bg-white p-4">
              <p className="text-xs text-slate-400">
                Available
              </p>

              <p className="mt-1 text-lg font-semibold text-emerald-400">
                ₹1,000
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-white p-4">
              <p className="text-xs text-slate-400">
                Locked
              </p>

              <p className="mt-1 text-lg font-semibold text-orange-400">
                ₹0
              </p>
            </div>

          </div>
        </div>


        {/* Transactions */}
        <div className="rounded-2xl  p-5 shadow-xl backdrop-blur md:p-6 xl:col-span-1">
          
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Transactions
              </h2>

              <p className="text-sm text-slate-400">
                Your latest wallet activity
              </p>
            </div>

            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          </div>

          <OnRampTransactions transactions={transactions} />
        </div>

      </div>


      {/* Bottom Security Banner */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 md:flex-row md:items-center">
        
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20">
            🔒
          </div>

          <div>
            <p className="font-medium">
              Secure Payments
            </p>

            <p className="text-sm text-slate-400">
              Your transactions are protected and securely processed.
            </p>
          </div>
        </div>

        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          Secure Wallet
        </span>

      </div>

    </div>
  );
};

export default Transfer;

