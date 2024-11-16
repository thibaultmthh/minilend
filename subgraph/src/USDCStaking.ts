import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  SuppliedToLendingPlatform,
  StakeAndRewardsWithdrawn,
  RewardsDistributed,
  RewardPool,
  WinnerSet,
  Referred,
} from "../generated/USDCStaking/USDCStaking";
import {
  User,
  Stake,
  Wave,
  Winner,
  Withdraw,
  ProtocolMetrics,
  DepositEvent,
  WithdrawEvent,
  RewardEvent,
  ReferralEvent,
  WaveStartEvent,
  WaveEndEvent
} from "../generated/schema";

// Helper functions
function getOrCreateUser(address: Address, timestamp: BigInt): User {
  let user = User.load(address.toHexString());
  if (user == null) {
    user = new User(address.toHexString());
    user.totalStake = BigInt.zero();
    user.totalReward = BigInt.zero();
    user.createdAt = timestamp;
    user.lastActionAt = timestamp;
    user.save();

    let protocolMetrics = getOrCreateProtocolMetrics();
    protocolMetrics.totalUsers += 1;
    protocolMetrics.save();
  }
  return user;
}

function getOrCreateProtocolMetrics(): ProtocolMetrics {
  let protocolMetrics = ProtocolMetrics.load("singleton");
  if (!protocolMetrics) {
    protocolMetrics = new ProtocolMetrics("singleton");
    protocolMetrics.totalStaked = BigInt.zero();
    protocolMetrics.totalRewardsGiven = BigInt.zero();
    protocolMetrics.totalUsers = 0;
    protocolMetrics.save();
  }
  return protocolMetrics;
}

function getOrCreateWave(waveId: BigInt, timestamp: BigInt, blockNumber: BigInt): Wave {
  let id = waveId.toString();
  let wave = Wave.load(id);
  if (wave == null) {
    wave = new Wave(id);
    wave.totalStake = BigInt.zero();
    wave.totalReward = BigInt.zero();
    wave.rewardsDistributed = false;
    wave.randomSeed = BigInt.zero();
    wave.startedAt = timestamp;
    wave.blockNumber = blockNumber;
    wave.save();

    // Create WaveStartEvent
    let waveStartEvent = new WaveStartEvent(id + "-start");
    waveStartEvent.timestamp = timestamp;
    waveStartEvent.blockNumber = blockNumber;
    waveStartEvent.transactionHash = "";
    waveStartEvent.user = "0x0000000000000000000000000000000000000000";
    waveStartEvent.wave = id;
    waveStartEvent.totalStake = BigInt.zero();
    waveStartEvent.save();
  }
  return wave;
}

function generateEventId(hash: string, logIndex: BigInt): string {
  return hash + "-" + logIndex.toString();
}

export function handleSuppliedToLendingPlatform(
  event: SuppliedToLendingPlatform
): void {
  let user = getOrCreateUser(event.params.user, event.block.timestamp);
  let wave = getOrCreateWave(event.params.wave, event.block.timestamp, event.block.number);
  let eventId = generateEventId(event.transaction.hash.toHexString(), event.logIndex);

  // Update user data
  user.lastActionAt = event.block.timestamp;
  user.totalStake = user.totalStake.plus(event.params.amount);
  user.save();

  // Update wave data
  wave.totalStake = wave.totalStake.plus(event.params.amount);
  wave.save();

  // Create stake record
  let stake = new Stake(eventId);
  stake.user = user.id;
  stake.amount = event.params.amount;
  stake.wave = wave.id;
  stake.timestamp = event.block.timestamp;
  stake.blockNumber = event.block.number;
  stake.transactionHash = event.transaction.hash.toHexString();
  stake.save();

  // Create deposit event
  let depositEvent = new DepositEvent(eventId);
  depositEvent.timestamp = event.block.timestamp;
  depositEvent.blockNumber = event.block.number;
  depositEvent.transactionHash = event.transaction.hash.toHexString();
  depositEvent.user = user.id;
  depositEvent.wave = wave.id;
  depositEvent.amount = event.params.amount;
  depositEvent.from = event.params.user.toHexString();
  depositEvent.to = event.address.toHexString();
  depositEvent.save();

  // Update protocol metrics
  let protocolMetrics = getOrCreateProtocolMetrics();
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.plus(event.params.amount);
  protocolMetrics.save();
}

export function handleStakeAndRewardsWithdrawn(
  event: StakeAndRewardsWithdrawn
): void {
  let user = getOrCreateUser(event.params.user, event.block.timestamp);
  let wave = getOrCreateWave(event.params.wave, event.block.timestamp, event.block.number);
  let eventId = generateEventId(event.transaction.hash.toHexString(), event.logIndex);

  // Update user data
  user.lastActionAt = event.block.timestamp;
  user.totalStake = user.totalStake.minus(event.params.amount);
  user.save();

  // Create withdraw record
  let withdraw = new Withdraw(eventId);
  withdraw.user = user.id;
  withdraw.amount = event.params.amount;
  withdraw.wave = wave.id;
  withdraw.timestamp = event.block.timestamp;
  withdraw.blockNumber = event.block.number;
  withdraw.transactionHash = event.transaction.hash.toHexString();
  withdraw.save();

  // Create withdraw event
  let withdrawEvent = new WithdrawEvent(eventId);
  withdrawEvent.timestamp = event.block.timestamp;
  withdrawEvent.blockNumber = event.block.number;
  withdrawEvent.transactionHash = event.transaction.hash.toHexString();
  withdrawEvent.user = user.id;
  withdrawEvent.wave = wave.id;
  withdrawEvent.amount = event.params.amount;
  withdrawEvent.from = event.address.toHexString();
  withdrawEvent.to = event.params.user.toHexString();
  withdrawEvent.save();

  // Update protocol metrics
  let protocolMetrics = getOrCreateProtocolMetrics();
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.minus(event.params.amount);
  protocolMetrics.save();
}

export function handleRewardsDistributed(
  event: RewardsDistributed
): void {
  let wave = getOrCreateWave(event.params.wave, event.block.timestamp, event.block.number);
  let eventId = generateEventId(event.transaction.hash.toHexString(), event.logIndex);

  // Update wave data
  wave.totalReward = event.params.totalReward;
  wave.rewardsDistributed = true;
  wave.endedAt = event.block.timestamp;
  wave.save();

  // Create wave end event
  let waveEndEvent = new WaveEndEvent(eventId);
  waveEndEvent.timestamp = event.block.timestamp;
  waveEndEvent.blockNumber = event.block.number;
  waveEndEvent.transactionHash = event.transaction.hash.toHexString();
  waveEndEvent.user = "0x0000000000000000000000000000000000000000";
  waveEndEvent.wave = wave.id;
  waveEndEvent.totalRewards = event.params.totalReward;
  waveEndEvent.totalParticipants = 0; // You might want to calculate this
  waveEndEvent.save();
}

export function handleRewardPool(
  event: RewardPool
): void {
  let wave = getOrCreateWave(event.params.wave, event.block.timestamp, event.block.number);
  wave.randomSeed = event.params.random;
  wave.save();
}

function calculateOdds(userStake: BigInt, totalStake: BigInt): string {
  if (userStake.equals(BigInt.zero()) || totalStake.equals(BigInt.zero())) {
    return "N/A";
  }
  let odds = totalStake.div(userStake);
  return "1 in " + odds.toString();
}

export function handleWinnerSet(
  event: WinnerSet
): void {
  let user = getOrCreateUser(event.params.user, event.block.timestamp);
  let wave = getOrCreateWave(event.params.wave, event.block.timestamp, event.block.number);
  let eventId = generateEventId(event.transaction.hash.toHexString(), event.logIndex);

  // Create winner record
  let winner = new Winner(eventId);
  winner.user = user.id;
  winner.wave = wave.id;
  winner.reward = event.params.reward;
  winner.odds = calculateOdds(user.totalStake, wave.totalStake);
  winner.timestamp = event.block.timestamp;
  winner.blockNumber = event.block.number;
  winner.transactionHash = event.transaction.hash.toHexString();
  winner.save();

  // Create reward event
  let rewardEvent = new RewardEvent(eventId);
  rewardEvent.timestamp = event.block.timestamp;
  rewardEvent.blockNumber = event.block.number;
  rewardEvent.transactionHash = event.transaction.hash.toHexString();
  rewardEvent.user = user.id;
  rewardEvent.wave = wave.id;
  rewardEvent.amount = event.params.reward;
  rewardEvent.odds = calculateOdds(user.totalStake, wave.totalStake);
  rewardEvent.save();

  // Update user data
  user.lastActionAt = event.block.timestamp;
  user.totalReward = user.totalReward.plus(event.params.reward);
  user.totalStake = user.totalStake.plus(event.params.reward);
  user.save();

  // Update protocol metrics
  let protocolMetrics = getOrCreateProtocolMetrics();
  protocolMetrics.totalRewardsGiven = protocolMetrics.totalRewardsGiven.plus(event.params.reward);
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.plus(event.params.reward);
  protocolMetrics.save();
}

export function handleReferred(
  event: Referred
): void {
  let referrer = getOrCreateUser(event.params.referrer, event.block.timestamp);
  let referred = getOrCreateUser(event.params.referred, event.block.timestamp);
  let eventId = generateEventId(event.transaction.hash.toHexString(), event.logIndex);

  // Update referral relationship
  referred.referrer = referrer.id;
  referred.save();

  // Create referral event
  let referralEvent = new ReferralEvent(eventId);
  referralEvent.timestamp = event.block.timestamp;
  referralEvent.blockNumber = event.block.number;
  referralEvent.transactionHash = event.transaction.hash.toHexString();
  referralEvent.user = referrer.id;
  referralEvent.referredUser = referred.id;
  referralEvent.save();
}