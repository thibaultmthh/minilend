"use client";

export default function PrizesPage() {
  return (
    <div className="relative pt-16 pb-24 px-4 max-w-7xl mx-auto">
      {/* Simple preview banner */}
      <div className="mb-8 text-yellow-300/80 text-center text-sm border border-yellow-300/20 rounded-lg p-2">
        🚧 Example Page - Rewards and missions shown are placeholders
      </div>

      {/* Daily Rewards Section */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Daily Rewards</h2>
        <p className="text-base text-white/60">Connect every day to claim your rewards!</p>
      </div>

      {/* Simplified Calendar */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3 mb-12 opacity-75">
        {[...Array(7)].map((_, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-xl border border-white/10 bg-white/5 p-2 md:p-3 flex flex-col items-center justify-center"
          >
            <span className="text-xs md:text-sm text-white/60">Day {idx + 1}</span>
            <span className="text-lg md:text-xl mt-1">?</span>
            <span className="text-xs md:text-sm font-medium mt-1">??? YL</span>
          </div>
        ))}
      </div>

      {/* Missions Section - Simplified */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Missions</h2>
        <p className="text-base text-white/60">Complete tasks to earn rewards</p>
      </div>

      {/* Placeholder Missions */}
      <div className="space-y-4 opacity-75">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">❔</span>
              <div className="w-32 h-4 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="w-20 h-8 bg-white/10 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
