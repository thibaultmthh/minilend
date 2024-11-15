"use client";

export default function DepositPage() {
  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Deposit</h2>
        <p className="text-base text-white/60">Deposit ETH to start earning interest and win prizes</p>
      </div>

      {/* Deposit Card */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Amount</span>
            <span className="text-sm text-white/60">Balance: 0.00 ETH</span>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              className="w-full bg-white/5 rounded-xl p-4 text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
              MAX
            </button>
          </div>

          <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-medium">Deposit ETH</button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4">
        {[
          { label: "Current APY", value: "4.2%" },
          { label: "Next Prize", value: "12.5 ETH" },
          { label: "Your Win Chance", value: "0%" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center"
          >
            <span className="text-white/60">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
