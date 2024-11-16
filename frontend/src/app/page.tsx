"use client";
// import { useQuery } from "@apollo/client";
// import { gql } from "../__generated__";
// import { useAccount } from "wagmi";
import { ERC20_STABLE_DECIMALS } from "../utils/constantes";
import { useWaves } from "../hooks/useWaves";
import { nFormatter } from "../utils/utils";
import { bigIntToFormattedString } from "../utils/bigintUtils";
import useMyDeposit from "../hooks/useMyDeposit";
import Link from "next/link";

// const STATS_QUERY = gql(`query GetStats{
//     protocolMetrics(id: "protocolMetrics") {
//       id
//       totalStaked
//       totalRewardsGiven
//       totalUsers

//     }
// }`);

import { useEffect, useState } from "react";
import { getNextSaturdayDrawTime, getTimeRemaining } from "../utils/dateUtils";

export default function Home() {
  // const { data: stats } = useQuery(STATS_QUERY);
  const { data: waves } = useWaves();
  const { stackedBalance } = useMyDeposit();
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const totalStaked = waves?.waves[waves?.waves?.length - 1]?.totalStake;

  console.log({ totalStaked });
  // const account = useAccount();

  useEffect(() => {
    const nextDraw = getNextSaturdayDrawTime();

    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(nextDraw));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="space-y-1 mb-4">
          <h2 className="text-2xl md:text-3xl font-medium text-white/90">Earn money without any risk!</h2>
          <p className="text-base text-white/60 m-px">Save your money</p>
          <p className="text-base text-white/60 m-px">Withdraw any time</p>
          <p className="text-base text-white/60 m-px">Multiply it. You just can&apos;t loose</p>
        </div>

        {/* Rest of the content (Stats, Cards, etc.) */}
        <div className="space-y-6">
          {/* Hero Stats */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-indigo-950 p-6">
            <div className="relative z-0">
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            <div className="relative z-10">
              <p className="text-sm text-white/60">Tontine total value</p>

              <h2 className="text-3xl font-bold mb-6">
                ${nFormatter(Number(bigIntToFormattedString(totalStaked || 0n, ERC20_STABLE_DECIMALS)))}
              </h2>

              <div className="flex justify-between items-end">
                <Link
                  href="deposit"
                  className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-6 py-3 rounded-xl font-medium"
                >
                  Deposit
                </Link>
              </div>
            </div>
          </div>

          {/* User Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Your Current Deposit",
                value:
                  nFormatter(
                    Number(bigIntToFormattedString(stackedBalance || 1000000000000000000000000n, ERC20_STABLE_DECIMALS))
                  ) + " $",
                color: "blue",
              },
              { label: "Winning Chance", value: "0%", color: "indigo" },
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
                { value: timeRemaining.days, label: "DAYS" },
                { value: timeRemaining.hours, label: "HOURS" },
                { value: timeRemaining.minutes, label: "MINS" },
                { value: timeRemaining.seconds, label: "SECS" },
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
              {waves?.waves
                ?.sort((a, b) => Number(b.endedAt || Infinity) - Number(a.endedAt || Infinity))
                .slice(0, 10)
                .map((wave) => {
                  const isCurrentWave = !wave.rewardsDistributed;
                  const date = wave.endedAt ? new Date(Number(wave.endedAt) * 1000) : null;
                  const formattedDate = date
                    ? date
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        .toUpperCase()
                    : "CURRENT WAVE";
                  const rewardAmount = bigIntToFormattedString(BigInt(wave.totalReward), ERC20_STABLE_DECIMALS);

                  return (
                    <div
                      key={wave.id}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm text-white/60">{formattedDate}</p>
                        {isCurrentWave ? (
                          <p className="text-sm text-blue-400">In Progress</p>
                        ) : (
                          <p className="font-mono text-sm">{wave.winners[0]?.user?.id}</p>
                        )}
                      </div>
                      <p className={`font-medium blur-sm ${isCurrentWave ? "text-blue-400" : "text-emerald-400"}`}>
                        {nFormatter(Number(rewardAmount))}$
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
