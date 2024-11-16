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
  ProtocolMetrics,
} from "../generated/schema";

function getOrCreateUser(address: Address): User {
  let user = User.load(address.toHex().toString());
  if (user == null) {
    user = new User(address.toHex().toString());
    user.totalStake = BigInt.zero();
    user.totalReward = BigInt.zero();
    user.save();
  }
  return user;
}

// Function to get or create the single ProtocolMetrics entity
function getOrCreateProtocolMetrics(): ProtocolMetrics {
  let protocolMetrics = ProtocolMetrics.load("protocolMetrics");
  if (!protocolMetrics) {
    protocolMetrics = new ProtocolMetrics("protocolMetrics");
    protocolMetrics.totalStaked = BigInt.zero();
    protocolMetrics.totalRewardsGiven = BigInt.zero();

    protocolMetrics.totalUsers = 0;
  }
  return protocolMetrics;
}

function getOrCreateWave(waveId: BigInt): Wave {
  let wave = Wave.load(waveId.toString());
  if (wave == null) {
    wave = new Wave(waveId.toString());
    wave.totalStake = BigInt.zero();
    wave.totalReward = BigInt.zero();
    wave.rewardsDistributed = false;
    wave.save();
  }
  return wave;
}

export function handleSuppliedToLendingPlatform(
  event: SuppliedToLendingPlatform
): void {
  let user = getOrCreateUser(event.params.user);
  let wave = getOrCreateWave(event.params.wave);

  // Update user's total stake
  user.totalStake = user.totalStake.plus(event.params.amount);
  user.save();
  // Update wave's total stake
  wave.totalStake = wave.totalStake.plus(event.params.amount);
  wave.save();
  // Create a new Stake instance
  let stake = new Stake(event.transaction.hash.toHex());
  stake.amount = event.params.amount;
  stake.user = user.id;
  stake.wave = wave.id;
  stake.save();
  // Protocol metrics adjustment
  let protocolMetrics = getOrCreateProtocolMetrics();
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.plus(
    event.params.amount
  );
  if (user.totalStake.minus(event.params.amount).equals(BigInt.zero()))
    protocolMetrics.totalUsers = protocolMetrics.totalUsers + 1;
  protocolMetrics.save();
}

export function handleStakeAndRewardsWithdrawn(
  event: StakeAndRewardsWithdrawn
): void {
  let user = getOrCreateUser(event.params.user);

  // Decrease user's total stake
  user.totalStake = user.totalStake.minus(event.params.amount);
  // Adjust total rewards given in protocol metrics
  let protocolMetrics = getOrCreateProtocolMetrics();
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.minus(
    event.params.amount
  );
  protocolMetrics.save();
  user.save();
}

export function handleRewardsDistributed(event: RewardsDistributed): void {
  let wave = getOrCreateWave(event.params.wave);

  // Update wave's total reward and distribution status
  wave.totalReward = event.params.totalReward;
  wave.rewardsDistributed = true;
  wave.save();
}

export function handleRewardPool(event: RewardPool): void {
  let wave = getOrCreateWave(event.params.wave);

  // Update the wave with the random seed
  wave.randomSeed = event.params.random;
  wave.save();
}

export function handleWinnerSet(event: WinnerSet): void {
  let user = getOrCreateUser(event.params.user);
  let wave = getOrCreateWave(event.params.wave);

  // Create a new Winner instance
  let winner = new Winner(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  let protocolMetrics = getOrCreateProtocolMetrics();

  winner.odds = calculateOdds(user.id, protocolMetrics.totalStaked); // This is a placeholder
  // Increase user's total reward
  user.totalReward = user.totalReward.plus(event.params.reward);
  user.totalStake = user.totalStake.plus(event.params.reward);
  user.save();

  winner.user = user.id;
  winner.wave = wave.id;
  winner.reward = event.params.reward;
  winner.save();

  // Adjust total rewards given in protocol metrics

  protocolMetrics.totalRewardsGiven = protocolMetrics.totalRewardsGiven.plus(
    event.params.reward
  );
  protocolMetrics.totalStaked = protocolMetrics.totalStaked.plus(
    event.params.reward
  );
  protocolMetrics.save();
}

function calculateOdds(userId: string, amount: BigInt): string {
  let user = User.load(userId);

  if (!user || !amount || amount.isZero()) {
    return "N/A"; // Unable to calculate odds.
  }

  let userStake = user.totalStake;
  let totalStake = amount;

  if (userStake.isZero()) {
    return "0"; // No stake from the user.
  }

  let odds = totalStake.div(userStake);
  return "1 in " + odds.toString(); // Adjust this string to match your desired odds format.
}

// New handler for the Referred event
export function handleReferred(event: Referred): void {
  let referrer = getOrCreateUser(event.params.referrer);
  let referred = getOrCreateUser(event.params.referred);

  // Link the referred user to the referrer
  referred.referrer = referrer.id;
  referred.save();

  // The referredUsers field will be managed automatically by the @derivedFrom directive in the schema
}
