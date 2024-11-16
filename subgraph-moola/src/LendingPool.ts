import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Deposit,
  Withdraw,
  Borrow,
  Repay,
  LiquidationCall,
  ReserveDataUpdated,
  ReserveUsedAsCollateralEnabled,
  ReserveUsedAsCollateralDisabled
} from "../generated/LendingPool/LendingPool";
import {
  LendingPool,
  User,
  Reserve,
  UserReserve,
  LiquidationCall as LiquidationCallEntity
} from "../generated/schema";

function getOrCreateLendingPool(): LendingPool {
  let pool = LendingPool.load("1");
  if (!pool) {
    pool = new LendingPool("1");
    pool.paused = false;
    pool.totalValueLockedETH = BigInt.fromI32(0);
    pool.totalBorrowsETH = BigInt.fromI32(0);
    pool.lastUpdateTimestamp = BigInt.fromI32(0);
    pool.save();
  }
  return pool;
}

function getOrCreateUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (!user) {
    user = new User(address.toHexString());
    user.totalCollateralETH = BigInt.fromI32(0);
    user.totalBorrowsETH = BigInt.fromI32(0);
    user.availableBorrowsETH = BigInt.fromI32(0);
    user.currentLiquidationThreshold = BigInt.fromI32(0);
    user.ltv = BigInt.fromI32(0);
    user.healthFactor = BigInt.fromI32(0);
    user.borrowedReservesCount = 0;
    user.lastUpdateTimestamp = BigInt.fromI32(0);
    user.save();
  }
  return user;
}

function getOrCreateReserve(asset: Address): Reserve {
  let reserve = Reserve.load(asset.toHexString());
  if (!reserve) {
    reserve = new Reserve(asset.toHexString());
    let pool = getOrCreateLendingPool();
    reserve.pool = pool.id;
    reserve.name = "";
    reserve.symbol = "";
    reserve.decimals = 0;
    reserve.aTokenAddress = asset;
    reserve.stableDebtTokenAddress = asset;
    reserve.variableDebtTokenAddress = asset;
    reserve.liquidityRate = BigInt.fromI32(0);
    reserve.variableBorrowRate = BigInt.fromI32(0);
    reserve.stableBorrowRate = BigInt.fromI32(0);
    reserve.totalDeposits = BigInt.fromI32(0);
    reserve.totalStableBorrows = BigInt.fromI32(0);
    reserve.totalVariableBorrows = BigInt.fromI32(0);
    reserve.utilizationRate = BigInt.fromI32(0);
    reserve.liquidityIndex = BigInt.fromI32(0);
    reserve.variableBorrowIndex = BigInt.fromI32(0);
    reserve.isActive = true;
    reserve.isFrozen = false;
    reserve.borrowingEnabled = true;
    reserve.stableBorrowRateEnabled = true;
    reserve.lastUpdateTimestamp = BigInt.fromI32(0);
    reserve.save();
  }
  return reserve;
}

function getOrCreateUserReserve(user: User, reserve: Reserve): UserReserve {
  let id = user.id + "-" + reserve.id;
  let userReserve = UserReserve.load(id);
  if (!userReserve) {
    userReserve = new UserReserve(id);
    userReserve.user = user.id;
    userReserve.reserve = reserve.id;
    userReserve.scaledATokenBalance = BigInt.fromI32(0);
    userReserve.currentATokenBalance = BigInt.fromI32(0);
    userReserve.scaledVariableDebt = BigInt.fromI32(0);
    userReserve.currentVariableDebt = BigInt.fromI32(0);
    userReserve.principalStableDebt = BigInt.fromI32(0);
    userReserve.currentStableDebt = BigInt.fromI32(0);
    userReserve.stableBorrowRate = BigInt.fromI32(0);
    userReserve.stableBorrowLastUpdateTimestamp = BigInt.fromI32(0);
    userReserve.usageAsCollateralEnabled = true;
    userReserve.lastUpdateTimestamp = BigInt.fromI32(0);
    userReserve.save();
  }
  return userReserve;
}

export function handleDeposit(event: Deposit): void {
  let user = getOrCreateUser(event.params.user);
  let reserve = getOrCreateReserve(event.params.reserve);
  let userReserve = getOrCreateUserReserve(user, reserve);

  userReserve.scaledATokenBalance = userReserve.scaledATokenBalance.plus(event.params.amount);
  userReserve.currentATokenBalance = userReserve.currentATokenBalance.plus(event.params.amount);
  userReserve.lastUpdateTimestamp = event.block.timestamp;
  userReserve.save();

  reserve.totalDeposits = reserve.totalDeposits.plus(event.params.amount);
  reserve.lastUpdateTimestamp = event.block.timestamp;
  reserve.save();
}

export function handleBorrow(event: Borrow): void {
  let user = getOrCreateUser(event.params.user);
  let reserve = getOrCreateReserve(event.params.reserve);
  let userReserve = getOrCreateUserReserve(user, reserve);

  if (event.params.borrowRateMode.equals(BigInt.fromI32(1))) { // Stable
    userReserve.principalStableDebt = userReserve.principalStableDebt.plus(event.params.amount);
    userReserve.currentStableDebt = userReserve.currentStableDebt.plus(event.params.amount);
    userReserve.stableBorrowRate = event.params.borrowRate;
    reserve.totalStableBorrows = reserve.totalStableBorrows.plus(event.params.amount);
  } else { // Variable
    userReserve.scaledVariableDebt = userReserve.scaledVariableDebt.plus(event.params.amount);
    userReserve.currentVariableDebt = userReserve.currentVariableDebt.plus(event.params.amount);
    reserve.totalVariableBorrows = reserve.totalVariableBorrows.plus(event.params.amount);
  }

  userReserve.lastUpdateTimestamp = event.block.timestamp;
  userReserve.save();

  reserve.lastUpdateTimestamp = event.block.timestamp;
  reserve.save();

  user.borrowedReservesCount += 1;
  user.save();
}

export function handleLiquidationCall(event: LiquidationCall): void {
  let user = getOrCreateUser(event.params.user);
  let liquidationCall = new LiquidationCallEntity(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  );

  liquidationCall.user = user.id;
  liquidationCall.collateralReserve = event.params.collateralAsset.toHexString();
  liquidationCall.debtReserve = event.params.debtAsset.toHexString();
  liquidationCall.collateralAmount = event.params.liquidatedCollateralAmount;
  liquidationCall.debtToCover = event.params.debtToCover;
  liquidationCall.liquidator = event.params.liquidator;
  liquidationCall.receiveAToken = event.params.receiveAToken;
  liquidationCall.timestamp = event.block.timestamp;
  liquidationCall.save();
}

export function handleReserveDataUpdated(event: ReserveDataUpdated): void {
  let reserve = getOrCreateReserve(event.params.reserve);
  
  reserve.liquidityRate = event.params.liquidityRate;
  reserve.stableBorrowRate = event.params.stableBorrowRate;
  reserve.variableBorrowRate = event.params.variableBorrowRate;
  reserve.liquidityIndex = event.params.liquidityIndex;
  reserve.variableBorrowIndex = event.params.variableBorrowIndex;
  
  let utilizationRate = reserve.totalDeposits.equals(BigInt.fromI32(0)) 
    ? BigInt.fromI32(0)
    : (reserve.totalStableBorrows.plus(reserve.totalVariableBorrows))
      .times(BigInt.fromI32(10000))
      .div(reserve.totalDeposits);
  
  reserve.utilizationRate = utilizationRate;
  reserve.lastUpdateTimestamp = event.block.timestamp;
  reserve.save();
}