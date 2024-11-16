"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";

import useSendTxWithToasts from "../../hooks/useSendTxWithToasts";
import { ERC20_ABI } from "../../utils/ERC20_ABI";
import { ERC20_STABLE_CONTRACT, ERC20_STABLE_DECIMALS, STABLE_STAKING_CONTRACT } from "../../utils/constantes";
import { wagmiConfig } from "../../config/wagmiConfig";
import { STABLE_STAKING_ABI } from "../../utils/STABLE_STAKING_ABI";
import { nFormatter } from "../../utils/utils";
import { useErc20TokenInfo } from "../../hooks/useErc20TokenInfo";
import { bigIntToFormattedString, formattedStringToBigInt } from "../../utils/bigintUtils";

import useMyDeposit from "../../hooks/useMyDeposit";

export default function DepositPage() {
  const [depositAmount, setDepositAmount] = useState(0n);
  const [isLoading, setIsLoading] = useState(false);
  const { address: userAddress } = useAccount();
  const { sendTxWithToasts } = useSendTxWithToasts({ onSuccess: () => refetchAll() });

  const { stackedBalance, refetch: refetchWaves } = useMyDeposit();
  const {
    balance: stableBalance,
    allowance: stableAllowance,
    refetchBalance,
    refetchAllowance,
  } = useErc20TokenInfo({ tokenAddress: ERC20_STABLE_CONTRACT, userAddress, spenderAddress: STABLE_STAKING_CONTRACT });

  const refetchAll = () => {
    refetchBalance();
    refetchAllowance();
    refetchWaves();
  };

  const handleDeposit = async () => {
    if (depositAmount <= 0) return;
    setIsLoading(true);

    try {
      // Check balance
      if ((stableBalance || 0n) < depositAmount) {
        alert("Insufficient balance");
        return;
      }

      // Check and handle allowance
      if ((stableAllowance || 0n) < depositAmount) {
        await sendTxWithToasts(
          writeContract(wagmiConfig, {
            address: ERC20_STABLE_CONTRACT,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [STABLE_STAKING_CONTRACT, depositAmount],
          })
        );
        await refetchAllowance();
      }

      // Perform deposit
      await sendTxWithToasts(
        writeContract(wagmiConfig, {
          address: STABLE_STAKING_CONTRACT,
          abi: STABLE_STAKING_ABI,
          functionName: "stakeUSDC",
          args: [depositAmount],
        })
      );

      setDepositAmount(0n);
      refetchAll();
    } catch (error) {
      console.error("Deposit failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ stableAllowance, stableBalance });

  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">Deposit</h2>
        <p className="text-base text-white/60">Deposit ETH to start earning interest and win prizes</p>
      </div>

      {/* Staked Amount & Actions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Currently Staked</span>
            <span className="text-xl font-medium">
              {nFormatter(Number(bigIntToFormattedString(stackedBalance, ERC20_STABLE_DECIMALS)))} STABLE
            </span>
          </div>
          <button
            className="w-full bg-red-500/20 text-red-400 py-4 rounded-xl font-medium"
            onClick={() => {
              if (!userAddress) return alert("Please connect your wallet");

              sendTxWithToasts(
                writeContract(wagmiConfig, {
                  address: STABLE_STAKING_CONTRACT,
                  abi: STABLE_STAKING_ABI,
                  functionName: "withdrawStakeAndRewards",
                })
              ).then(() => refetchAll());
            }}
          >
            Withdraw STABLE
          </button>
        </div>
      </div>

      {/* Deposit Card - Updated */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Amount</span>
            <span className="text-sm text-white/60">
              Balance: {nFormatter(Number(bigIntToFormattedString(stableBalance || 0n, ERC20_STABLE_DECIMALS)))} STABLE
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              value={bigIntToFormattedString(depositAmount, ERC20_STABLE_DECIMALS)}
              onChange={(e) => setDepositAmount(formattedStringToBigInt(e.target.value, ERC20_STABLE_DECIMALS))}
              className="w-full bg-white/5 rounded-xl p-4 text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setDepositAmount(stableBalance || 0n)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm"
            >
              MAX
            </button>
          </div>

          <button
            onClick={handleDeposit}
            disabled={isLoading || depositAmount <= 0}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-medium disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : depositAmount <= 0
              ? "Enter an amount"
              : (stableAllowance || 0n) < depositAmount
              ? "Approve STABLE"
              : "Deposit STABLE"}
          </button>
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
