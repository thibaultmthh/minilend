import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  newMockEvent
} from "matchstick-as/assembly/index";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { 
  handleSuppliedToLendingPlatform,
  handleRewardsDistributed,
  handleRewardPool,
  handleWinnerSet
} from "../src/USDCStaking";
import { 
  SuppliedToLendingPlatform,
  RewardsDistributed,
  RewardPool,
  WinnerSet
} from "../generated/USDCStaking/USDCStaking";

describe("Wave Lifecycle", () => {
  beforeAll(() => {
    clearStore();
  });

  afterAll(() => {
    clearStore();
  });

  test("Wave lifecycle is tracked correctly", () => {
    // First create a stake
    let mockEvent = newMockEvent();
    let stakeEvent = createStakeEvent(mockEvent, "1", "1000");
    handleSuppliedToLendingPlatform(stakeEvent as SuppliedToLendingPlatform);

    // Then distribute rewards
    let rewardsEvent = createRewardsDistributedEvent(mockEvent, "1", "100");
    handleRewardsDistributed(rewardsEvent as RewardsDistributed);

    // Set random seed
    let poolEvent = createRewardPoolEvent(mockEvent, "1", "12345");
    handleRewardPool(poolEvent as RewardPool);

    // Set winner
    let winnerEvent = createWinnerSetEvent(mockEvent, "1", "100");
    handleWinnerSet(winnerEvent as WinnerSet);

    // Verify wave state
    assert.fieldEquals(
      "Wave",
      "1",
      "totalStake",
      "1000"
    );
    assert.fieldEquals(
      "Wave",
      "1",
      "totalReward",
      "100"
    );
    assert.fieldEquals(
      "Wave",
      "1",
      "randomSeed",
      "12345"
    );
    assert.fieldEquals(
      "Wave",
      "1",
      "rewardsDistributed",
      "true"
    );
  });
});

function createStakeEvent(mockEvent: ethereum.Event, wave: string, amount: string): ethereum.Event {
  let event = new SuppliedToLendingPlatform(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    new Array<ethereum.EventParam>(),
    mockEvent.receipt
  );

  let params = new Array<ethereum.EventParam>();
  params.push(
    new ethereum.EventParam(
      "wave",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(wave))
    )
  );
  params.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromAddress(Address.fromString("0x1234567890123456789012345678901234567890"))
    )
  );
  params.push(
    new ethereum.EventParam(
      "amount",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(amount))
    )
  );

  event.parameters = params;
  return event;
}

function createRewardsDistributedEvent(mockEvent: ethereum.Event, wave: string, amount: string): ethereum.Event {
  let event = new RewardsDistributed(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    new Array<ethereum.EventParam>(),
    mockEvent.receipt
  );

  let params = new Array<ethereum.EventParam>();
  params.push(
    new ethereum.EventParam(
      "wave",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(wave))
    )
  );
  params.push(
    new ethereum.EventParam(
      "totalReward",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(amount))
    )
  );

  event.parameters = params;
  return event;
}

function createRewardPoolEvent(mockEvent: ethereum.Event, wave: string, random: string): ethereum.Event {
  let event = new RewardPool(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    new Array<ethereum.EventParam>(),
    mockEvent.receipt
  );

  let params = new Array<ethereum.EventParam>();
  params.push(
    new ethereum.EventParam(
      "wave",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(wave))
    )
  );
  params.push(
    new ethereum.EventParam(
      "random",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(random))
    )
  );

  event.parameters = params;
  return event;
}

function createWinnerSetEvent(mockEvent: ethereum.Event, wave: string, amount: string): ethereum.Event {
  let event = new WinnerSet(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    new Array<ethereum.EventParam>(),
    mockEvent.receipt
  );

  let params = new Array<ethereum.EventParam>();
  params.push(
    new ethereum.EventParam(
      "wave",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(wave))
    )
  );
  params.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromAddress(Address.fromString("0x1234567890123456789012345678901234567890"))
    )
  );
  params.push(
    new ethereum.EventParam(
      "reward",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString(amount))
    )
  );

  event.parameters = params;
  return event;
}

// Helper functions for other events... 