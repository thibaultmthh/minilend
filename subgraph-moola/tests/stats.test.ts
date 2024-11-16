import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { updateDailyPoolStats, updateDailyReserveStats } from "../src/mappings/stats";
import { LendingPool, Reserve } from "../generated/schema";

describe("Stats", () => {
  beforeAll(() => {
    clearStore();
  });

  afterAll(() => {
    clearStore();
  });

  test("Daily pool stats are updated correctly", () => {
    // Create mock pool
    let pool = new LendingPool("1");
    pool.paused = false;
    pool.totalValueLockedETH = BigInt.fromI32(1000);
    pool.totalBorrowsETH = BigInt.fromI32(500);
    pool.lastUpdateTimestamp = BigInt.fromI32(1000);
    pool.searchText = "Test Pool";
    pool.save();

    // Update stats
    let timestamp = BigInt.fromI32(1000);
    let userAddress = Address.fromString("0x1234567890123456789012345678901234567890");
    updateDailyPoolStats(pool, timestamp, userAddress);

    // Check daily stat was created
    let dayId = timestamp.div(BigInt.fromI32(86400)).toString();
    let dailyStatId = dayId + "-1";
    
    assert.fieldEquals("DailyPoolStat", dailyStatId, "totalValueLockedETH", "1000");
    assert.fieldEquals("DailyPoolStat", dailyStatId, "totalBorrowsETH", "500");
    assert.fieldEquals("DailyPoolStat", dailyStatId, "uniqueUsers", "1");
  });

  test("Daily reserve stats track utilization correctly", () => {
    // Create mock reserve
    let reserve = new Reserve("0x5678");
    reserve.pool = "1";
    reserve.name = "Test Reserve";
    reserve.symbol = "TEST";
    reserve.decimals = 18;
    reserve.aTokenAddress = Address.fromString("0x1234567890123456789012345678901234567890");
    reserve.stableDebtTokenAddress = Address.fromString("0x1234567890123456789012345678901234567890");
    reserve.variableDebtTokenAddress = Address.fromString("0x1234567890123456789012345678901234567890");
    reserve.liquidityRate = BigInt.fromI32(200);
    reserve.variableBorrowRate = BigInt.fromI32(300);
    reserve.stableBorrowRate = BigInt.fromI32(250);
    reserve.totalDeposits = BigInt.fromI32(1000);
    reserve.totalStableBorrows = BigInt.fromI32(300);
    reserve.totalVariableBorrows = BigInt.fromI32(200);
    reserve.utilizationRate = BigInt.fromI32(50);
    reserve.liquidityIndex = BigInt.fromI32(0);
    reserve.variableBorrowIndex = BigInt.fromI32(0);
    reserve.isActive = true;
    reserve.isFrozen = false;
    reserve.borrowingEnabled = true;
    reserve.stableBorrowRateEnabled = true;
    reserve.lastUpdateTimestamp = BigInt.fromI32(1000);
    reserve.searchText = "Test Reserve";
    reserve.save();

    // Update stats
    let timestamp = BigInt.fromI32(1000);
    updateDailyReserveStats(reserve, timestamp);

    // Check daily stat was created
    let dayId = timestamp.div(BigInt.fromI32(86400)).toString();
    let dailyStatId = dayId + "-0x5678";
    
    assert.fieldEquals("DailyReserveStat", dailyStatId, "utilizationRate", "50");
    assert.fieldEquals("DailyReserveStat", dailyStatId, "totalDeposits", "1000");
    assert.fieldEquals("DailyReserveStat", dailyStatId, "totalBorrows", "500"); // 300 + 200
  });
}); 