"use client";

import { useAccount } from "wagmi";
import { formatEthAddress, nFormatter } from "../../utils/utils";
import { ERC20_STABLE_DECIMALS } from "../../utils/constantes";
import { bigIntToFormattedString } from "../../utils/bigintUtils";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../utils/dateUtils";

export default function ProfilePage() {
  const { address: userAddress } = useAccount();
  const { data: userData, loading } = useUser(userAddress);
  const user = userData?.user;

  const handleClearAcknowledgedWins = () => {
    localStorage.removeItem("acknowledgedWins");
    alert("Acknowledged wins cleared from local storage");
  };

  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
        <div>
          <h2 className="text-2xl font-medium text-white/90">
            {userAddress ? formatEthAddress(userAddress) : "not logged"}
          </h2>
          <p className="text-white/60">Joined March 2024</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          {
            label: "Total Deposited",
            value: user
              ? `$${nFormatter(
                  Number(
                    bigIntToFormattedString(
                      user.totalStake,
                      ERC20_STABLE_DECIMALS
                    )
                  )
                )}`
              : "$0.00",
          },
          {
            label: "Total Won",
            value: user
              ? `$${nFormatter(
                  Number(
                    bigIntToFormattedString(
                      user.totalReward,
                      ERC20_STABLE_DECIMALS
                    )
                  )
                )}`
              : "$0.00",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <p className="text-sm text-white/60">{stat.label}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Clear Acknowledged Wins Button */}

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transaction History </h3>
        <div className="space-y-2">
          {loading ? (
            <div className="text-white/60">Loading...</div>
          ) : !user ? (
            <div className="text-white/60">No transactions found</div>
          ) : (
            [
              ...(user.depositEvents || []),
              ...(user.withdrawEvents || []),
              ...(user.rewardEvents || []),
            ]
              .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
              .map((event) => {
                const isDeposit =
                  "depositEvents" in user &&
                  user.depositEvents?.some((d) => d.id === event.id);
                const isReward =
                  "rewardEvents" in user &&
                  user.rewardEvents?.some((r) => r.id === event.id);

                return (
                  <div
                    key={event.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {isDeposit ? "Deposit" : isReward ? "Win" : "Withdraw"}
                      </p>
                      <p className="text-sm text-white/60">
                        {formatDate(Number(event.timestamp) * 1000)}
                      </p>
                    </div>
                    <p
                      className={`font-medium ${
                        isReward
                          ? "text-emerald-400"
                          : isDeposit
                          ? "text-blue-400"
                          : "text-red-400"
                      }`}
                    >
                      {isDeposit || isReward ? "+" : "-"}$
                      {nFormatter(
                        Number(
                          bigIntToFormattedString(
                            event.amount,
                            ERC20_STABLE_DECIMALS
                          )
                        )
                      )}
                    </p>
                  </div>
                );
              })
          )}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="mb-8">
        <button
          onClick={handleClearAcknowledgedWins}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl border border-red-500/20"
        >
          Clear Acknowledged Wins
        </button>
      </div>
    </div>
  );
}
