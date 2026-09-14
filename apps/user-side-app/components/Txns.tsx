"use client";

export default function Txns({
  p2pTxns,
  onRampTxns,
}: {
  p2pTxns: any[];
  onRampTxns: any[];
}) {
  const txns = [
    ...p2pTxns.map((txn) => ({
      ...txn,
      txnType: "p2p",
    })),

    ...onRampTxns.map((txn) => ({
      ...txn,
      txnType: "onRamp",
    })),
  ];

  txns.sort(
    (a, b) =>
      new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5">
      
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Recent Transactions
      </h2>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        <div className="space-y-3">

          {txns.map((txn) => {

            // P2P
            if (txn.txnType === "p2p") {
              return (
                <div
                  key={`p2p - ${ txn.id } `}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <div className="min-w-0">
                    <p
                      className={`font - medium ${
    txn.type === "sent"
        ? "text-red-600"
        : "text-green-600"
} `}
                    >
                      {txn.type === "sent"
                        ? `Sent to ${ txn.toMobile } `
                        : `Received from ${ txn.fromMobile } `}
                    </p>

                    <p className="text-xs text-gray-500">
                      P2P Transfer •{" "}
                      {new Date(txn.time).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <p
                    className={`ml - 4 whitespace - nowrap font - semibold ${
    txn.type === "sent"
        ? "text-red-600"
        : "text-green-600"
} `}
                  >
                    {txn.type === "sent" ? "-" : "+"} ₹{txn.amount}
                  </p>
                </div>
              );
            }

            // ON RAMP
            return (
              <div
                key={`onramp - ${ txn.id } `}
                className="flex items-center justify-between border-b border-gray-100 pb-3"
              >
                <div className="min-w-0">
                  <p className="font-medium text-green-600">
                    Added via HDFC Bank
                  </p>

                  <p className="text-xs text-gray-500">
                    {txn.provider} • {txn.status} •{" "}
                    {new Date(txn.time).toLocaleString("en-IN")}
                  </p>
                </div>

                <p className="ml-4 whitespace-nowrap font-semibold text-green-600">
                  + ₹{txn.amount}
                </p>
              </div>
            );
          })}

          {txns.length === 0 && (
            <p className="py-6 text-center text-gray-500">
              No transactions yet
            </p>
          )}

        </div>
      </div>
    </div>
  );
}