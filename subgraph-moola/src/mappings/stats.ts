import { BigInt, Address } from "@graphprotocol/graph-ts";
import { DailyPoolStat, DailyReserveStat, LendingPool, Reserve } from "../../generated/schema";

export function updateDailyPoolStats(pool: LendingPool, timestamp: BigInt, userAddress: Address): void {
  let dayID = timestamp.div(BigInt.fromI32(86400)).toString();
  let dailyStat = DailyPoolStat.load(dayID + "-" + pool.id);
  
  if (!dailyStat) {
    dailyStat = new DailyPoolStat(dayID + "-" + pool.id);
    dailyStat.pool = pool.id;
    dailyStat.timestamp = timestamp;
    dailyStat.totalValueLockedETH = pool.totalValueLockedETH;
    dailyStat.totalBorrowsETH = pool.totalBorrowsETH;
    dailyStat.dailyVolume = BigInt.fromI32(0);
    dailyStat.uniqueUsers = 1;
    dailyStat.txCount = 0;
  } else {
    dailyStat.uniqueUsers += 1;
  }
  
  // Update other metrics
  dailyStat.totalValueLockedETH = pool.totalValueLockedETH;
  dailyStat.totalBorrowsETH = pool.totalBorrowsETH;
  dailyStat.txCount += 1;
  dailyStat.dailyVolume = dailyStat.dailyVolume.plus(
    pool.totalValueLockedETH.minus(dailyStat.totalValueLockedETH)
  ).abs();
  
  dailyStat.save();
}

export function updateDailyReserveStats(reserve: Reserve, timestamp: BigInt): void {
  let dayID = timestamp.div(BigInt.fromI32(86400)).toString();
  let dailyStat = DailyReserveStat.load(dayID + "-" + reserve.id);
  
  if (!dailyStat) {
    dailyStat = new DailyReserveStat(dayID + "-" + reserve.id);
    dailyStat.reserve = reserve.id;
    dailyStat.timestamp = timestamp;
    dailyStat.utilizationRate = BigInt.fromI32(0);
    dailyStat.totalDeposits = BigInt.fromI32(0);
    dailyStat.totalBorrows = BigInt.fromI32(0);
    dailyStat.depositAPY = BigInt.fromI32(0);
    dailyStat.borrowAPY = BigInt.fromI32(0);
  }
  
  dailyStat.utilizationRate = reserve.utilizationRate;
  dailyStat.totalDeposits = reserve.totalDeposits;
  dailyStat.totalBorrows = reserve.totalStableBorrows.plus(reserve.totalVariableBorrows);
  dailyStat.depositAPY = reserve.liquidityRate;
  dailyStat.borrowAPY = reserve.variableBorrowRate;
  dailyStat.save();
} 