"use client";

import { useAccount } from "wagmi";
import { formatEthAddress } from "../../utils/utils";

export default function ProfilePage() {
  const { address: userAddress } = useAccount();
  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
        <div>
          <h2 className="text-2xl font-medium text-white/90">{formatEthAddress(userAddress)}</h2>
          <p className="text-white/60">Joined March 2024</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "Total Deposited", value: "0.0 ETH" },
          { label: "Total Won", value: "0.0 ETH" },
          { label: "YL Points", value: "0 YL" },
          { label: "Win Rate", value: "0%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-sm text-white/60">{stat.label}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <div className="space-y-2">
          {[
            { type: "Deposit", amount: "+2.5 ETH", date: "Mar 15, 2024" },
            { type: "Win", amount: "+0.5 ETH", date: "Mar 08, 2024" },
          ].map((tx, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{tx.type}</p>
                <p className="text-sm text-white/60">{tx.date}</p>
              </div>
              <p className={`font-medium ${tx.type === "Win" ? "text-emerald-400" : "text-blue-400"}`}>{tx.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
