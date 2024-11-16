"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";

import useSendTxWithToasts from "../../hooks/useSendTxWithToasts";
import { ERC20_ABI } from "../../utils/ERC20_ABI";
import {
  ERC20_STABLE_CONTRACT,
  ERC20_STABLE_DECIMALS,
  STABLE_STAKING_CONTRACT,
  IS_MINI_PAY,
} from "../../utils/constantes";
import { wagmiConfig } from "../../config/wagmiConfig";
import { STABLE_STAKING_ABI } from "../../utils/STABLE_STAKING_ABI";
import { nFormatter } from "../../utils/utils";
import { useErc20TokenInfo } from "../../hooks/useErc20TokenInfo";
import {
  bigIntToFormattedString,
  formattedStringToBigInt,
} from "../../utils/bigintUtils";

import useMyDeposit from "../../hooks/useMyDeposit";

import { Button } from "../../components/ui/button";
import { dcaService, DCASubscription } from "../../services/dcaService";

export default function DepositPage() {
  const [depositAmount, setDepositAmount] = useState(0n);
  const [isLoading, setIsLoading] = useState(false);
  const { address: userAddress } = useAccount();
  const { sendTxWithToasts } = useSendTxWithToasts({
    onSuccess: () => refetchAll(),
  });

  const { stackedBalance, refetch: refetchWaves } = useMyDeposit();
  const {
    balance: stableBalance,
    allowance: stableAllowance,
    refetchBalance,
    refetchAllowance,
  } = useErc20TokenInfo({
    tokenAddress: ERC20_STABLE_CONTRACT,
    userAddress,
    spenderAddress: STABLE_STAKING_CONTRACT,
  });

  const [dcaAmount, setDcaAmount] = useState(0n);
  const [dcaDay, setDcaDay] = useState(1);
  const [dcaMonths, setDcaMonths] = useState(1);
  const [isLoadingDCA, setIsLoadingDCA] = useState(false);
  const [currentDCA, setCurrentDCA] = useState<DCASubscription | null>(null);

  useEffect(() => {
    if (userAddress) {
      dcaService
        .getSubscription(userAddress)
        .then(setCurrentDCA)
        .catch(console.error);
    }
  }, [userAddress]);

  const refetchAll = () => {
    refetchAllowance();
    refetchWaves();
    setTimeout(() => {
      refetchBalance();
    }, 400);
    setTimeout(() => {
      refetchBalance();
    }, 1400);
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
            feeCurrency: ERC20_STABLE_CONTRACT,
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
          feeCurrency: ERC20_STABLE_CONTRACT,
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

  const handleDCASetup = async () => {
    if (!userAddress || dcaAmount <= 0) return;
    setIsLoadingDCA(true);

    try {
      const totalDCAAmount = dcaAmount * BigInt(dcaMonths);

      if ((stableAllowance || 0n) < totalDCAAmount) {
        await sendTxWithToasts(
          writeContract(wagmiConfig, {
            address: ERC20_STABLE_CONTRACT,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [STABLE_STAKING_CONTRACT, totalDCAAmount],
            feeCurrency: ERC20_STABLE_CONTRACT,
          })
        );
        await refetchAllowance();
      }

      // Subscribe to DCA
      await dcaService.subscribe(
        userAddress,
        dcaDay,
        bigIntToFormattedString(dcaAmount, ERC20_STABLE_DECIMALS)
      );

      // Refresh DCA subscription
      const subscription = await dcaService.getSubscription(userAddress);
      setCurrentDCA(subscription);

      // Reset form
      setDcaAmount(0n);
      setDcaDay(1);
      setDcaMonths(1);
    } catch (error) {
      console.error("DCA setup failed:", error);
      alert("Failed to setup DCA: " + (error as Error).message);
    } finally {
      setIsLoadingDCA(false);
    }
  };

  const handleCancelDCA = async () => {
    if (!userAddress) return;
    setIsLoadingDCA(true);

    try {
      await dcaService.unsubscribe(userAddress);
      setCurrentDCA(null);
    } catch (error) {
      console.error("Failed to cancel DCA:", error);
      alert("Failed to cancel DCA: " + (error as Error).message);
    } finally {
      setIsLoadingDCA(false);
    }
  };

  console.log({ stableAllowance, stableBalance });

  return (
    <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90">
          Deposit
        </h2>
        <p className="text-base text-white/60">
          Deposit $ to start earning interest and win prizes
        </p>
      </div>

      {/* Deposit Card - Updated */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Amount</span>
            <div>
              <span className="text-sm text-white/60">
                Balance:{" "}
                {nFormatter(
                  Number(
                    bigIntToFormattedString(
                      stableBalance || 0n,
                      ERC20_STABLE_DECIMALS
                    )
                  )
                )}{" "}
                $
              </span>
              {IS_MINI_PAY &&
                (Number(
                  bigIntToFormattedString(
                    stableBalance || 0n,
                    ERC20_STABLE_DECIMALS
                  )
                ) || 0) < 1 && (
                  <a
                    href="https://minipay.opera.com/add_cash"
                    className="ml-2 text-sm text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add funds
                  </a>
                )}
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              placeholder="0.0"
              value={bigIntToFormattedString(
                depositAmount,
                ERC20_STABLE_DECIMALS
              )}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || parseFloat(value) < 0) {
                  setDepositAmount(0n);
                } else {
                  setDepositAmount(
                    formattedStringToBigInt(value, ERC20_STABLE_DECIMALS)
                  );
                }
              }}
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
              ? "Approve"
              : "Deposit"}
          </button>
        </div>
      </div>

      {/* Staked Amount & Actions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Your Current Deposit</span>
            <span className="text-xl font-medium">
              {nFormatter(
                Number(
                  bigIntToFormattedString(stackedBalance, ERC20_STABLE_DECIMALS)
                )
              )}{" "}
              $
            </span>
          </div>
          <button
            disabled={!userAddress || stackedBalance <= 0n}
            className="w-full bg-gray-500/20 text-gray-300 py-4 rounded-xl font-medium 
              hover:bg-red-500/20 hover:text-red-400 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500/20 disabled:hover:text-gray-300"
            onClick={() => {
              if (!userAddress) return alert("Please connect your wallet");
              if (stackedBalance <= 0n) return;

              sendTxWithToasts(
                writeContract(wagmiConfig, {
                  address: STABLE_STAKING_CONTRACT,
                  abi: STABLE_STAKING_ABI,
                  functionName: "withdrawStakeAndRewards",
                  feeCurrency: ERC20_STABLE_CONTRACT,
                })
              ).then(() => refetchAll());
            }}
          >
            {!userAddress
              ? "Connect Wallet"
              : stackedBalance <= 0n
              ? "No value to withdraw"
              : "Withdraw $"}
          </button>
        </div>
      </div>

      {/* DCA Settings Card */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium text-white/90">
              Set up Monthly Automatic Recurring Deposit
            </h3>
            {currentDCA && (
              <Button
                variant="danger"
                size="sm"
                isLoading={isLoadingDCA}
                onClick={handleCancelDCA}
              >
                Cancel Automatic Recurring Deposit
              </Button>
            )}
          </div>

          {currentDCA ? (
            <div className="space-y-2">
              <p className="text-white/60">
                Current Deposit Strategie: ${currentDCA.amount} scheduled for
                day {currentDCA.dayOfMonth} of each month
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <span className="text-white/60">Monthly Amount</span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0.0"
                    value={bigIntToFormattedString(
                      dcaAmount,
                      ERC20_STABLE_DECIMALS
                    )}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseFloat(value) < 0) {
                        setDcaAmount(0n);
                      } else {
                        setDcaAmount(
                          formattedStringToBigInt(value, ERC20_STABLE_DECIMALS)
                        );
                      }
                    }}
                    className="w-full bg-white/5 rounded-xl p-4 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-white/60">Day of Month</span>
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={dcaDay}
                  onChange={(e) =>
                    setDcaDay(
                      Math.min(28, Math.max(1, parseInt(e.target.value)))
                    )
                  }
                  className="w-full bg-white/5 rounded-xl p-4 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <span className="text-white/60">Number of Months</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={dcaMonths}
                  onChange={(e) =>
                    setDcaMonths(
                      Math.min(12, Math.max(1, parseInt(e.target.value)))
                    )
                  }
                  className="w-full bg-white/5 rounded-xl p-4 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleDCASetup}
                disabled={dcaAmount <= 0}
                isLoading={isLoadingDCA}
                className="w-full"
              >
                Setup Monthly Automatic Recurring Deposit
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Info Cards */}
      {/* <div className="grid gap-4">
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
      </div> */}
    </div>
  );
}
