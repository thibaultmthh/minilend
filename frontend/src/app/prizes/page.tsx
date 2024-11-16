"use client";

export default function PrizesPage() {
  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      <div className="mb-8 text-yellow-300/80 text-center text-sm border border-yellow-300/20 rounded-lg p-2">
        🚧 Example Page - Rewards and missions shown are placeholders
      </div>
      {/* Daily Rewards Section */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Daily Rewards</h2>
        <p className="text-base text-white/60">Connect every day to claim your rewards and boost your earnings!</p>
      </div>

      {/* Daily Rewards Calendar */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3 mb-12">
        {[...Array(7)].map((_, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-xl border ${
              idx === 2
                ? "bg-blue-500 border-blue-400"
                : idx < 2
                ? "bg-gray-500/20 border-gray-500"
                : "bg-white/5 border-white/10"
            } p-2 md:p-3 flex flex-col items-center justify-center relative`}
          >
            <span className="text-xs md:text-sm text-white/60">Day {idx + 1}</span>
            <span className="text-lg md:text-xl mt-1">🎁</span>
            <span className="text-xs md:text-sm font-medium mt-1">{idx === 6 ? "100 🎟️" : `${(idx + 1) * 10} 🎟️`}</span>
            {idx === 2 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />}
          </div>
        ))}
      </div>

      {/* Missions Section */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Missions</h2>
        <p className="text-base text-white/60">Complete tasks to earn additional rewards</p>
      </div>

      {/* Mission Cards */}
      <div className="space-y-4">
        {[
          {
            icon: "🐦",
            title: "Follow on Twitter",
            reward: "50 🎟️",
            status: "completed",
          },
          {
            icon: "❤️",
            title: "Like & Retweet our latest post",
            reward: "100 🎟️",
            status: "active",
          },
          {
            icon: "👥",
            title: "Invite 3 friends",
            reward: "200 🎟️",
            status: "active",
          },
          {
            icon: "💰",
            title: "Make your first deposit",
            reward: "500 🎟️",
            status: "locked",
          },
        ].map((mission) => (
          <div
            key={mission.title}
            className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{mission.icon}</span>
              <div>
                <h3 className="font-medium">{mission.title}</h3>
                <p className="text-sm text-white/60">Reward: {mission.reward}</p>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                mission.status === "completed"
                  ? "bg-gray-500 text-white/60 cursor-not-allowed"
                  : mission.status === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-white/60 cursor-not-allowed"
              }`}
            >
              {mission.status === "completed" ? "Claimed" : mission.status === "active" ? "Claim" : "Locked"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
