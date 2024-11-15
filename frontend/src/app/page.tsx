"use client";

import { useAccount } from "wagmi";
import ConnectButton from "../components/ConnectButton";

export default function Home() {
  const account = useAccount();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">YL</h1>
          <ConnectButton />
        </div>
      </nav>

      {/* Main Content - Starts below navbar */}
      <div className="pt-20 px-4 max-w-7xl mx-auto space-y-6">
        {/* Hero Stats */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 to-indigo-950 p-6">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <h2 className="text-3xl font-bold mb-6">$1,234,567</h2>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-white/60">Total Pool Size</p>
              <p className="text-lg font-medium">4.2% APY</p>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium">Deposit</button>
          </div>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Your Deposit", value: "0.0 ETH", color: "blue" },
            { label: "Win Chance", value: "0%", color: "indigo" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-white/60">{stat.label}</p>
              <p className={`text-xl font-semibold text-${stat.color}-400`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm text-white/60 mb-2">Next Draw In</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: "02", label: "DAYS" },
              { value: "14", label: "HOURS" },
              { value: "33", label: "MINS" },
              { value: "45", label: "SECS" },
            ].map((time) => (
              <div key={time.label} className="text-center">
                <p className="text-2xl font-bold">{time.value}</p>
                <p className="text-xs text-white/60">{time.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Winners */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Winners</h3>
          <div className="space-y-2">
            {[
              { date: "MAR 15", address: "0x1234...5678", amount: "12.5 ETH" },
              { date: "MAR 08", address: "0x8765...4321", amount: "10.2 ETH" },
            ].map((winner, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-white/60">{winner.date}</p>
                  <p className="font-mono text-sm">{winner.address}</p>
                </div>
                <p className="text-emerald-400 font-medium">{winner.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
