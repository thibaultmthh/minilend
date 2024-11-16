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
  handleWinnerSet,
  handleStakeAndRewardsWithdrawn
} from "../src/USDCStaking";
import { 
  SuppliedToLendingPlatform,
  WinnerSet,
  StakeAndRewardsWithdrawn
} from "../generated/USDCStaking/USDCStaking";

describe("User Rewards", () => {
  beforeAll(() => {
    clearStore();
  });

  afterAll(() => {
    clearStore();
  });

  test("User rewards are tracked correctly", () => {
    let mockEvent = newMockEvent();
    let userAddress = "0x1234567890123456789012345678901234567890";

    // Create initial stake
    let stakeEvent = createStakeEvent(mockEvent, userAddress, "1000");
    handleSuppliedToLendingPlatform(stakeEvent as SuppliedToLendingPlatform);

    // Set user as winner
    let winnerEvent = createWinnerEvent(mockEvent, userAddress, "100");
    handleWinnerSet(winnerEvent as WinnerSet);

    // Verify user state
    assert.fieldEquals(
      "User",
      userAddress,
      "totalStake",
      "1100" // Initial stake + reward
    );
    assert.fieldEquals(
      "User",
      userAddress,
      "totalReward",
      "100"
    );

    // Handle withdrawal
    let withdrawEvent = createWithdrawEvent(mockEvent, userAddress, "1100");
    handleStakeAndRewardsWithdrawn(withdrawEvent as StakeAndRewardsWithdrawn);

    // Verify final state
    assert.fieldEquals(
      "User",
      userAddress,
      "totalStake",
      "0"
    );
  });
});

function createStakeEvent(mockEvent: ethereum.Event, userAddress: string, amount: string): ethereum.Event {
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
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))
    )
  );
  params.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromAddress(Address.fromString(userAddress))
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

function createWinnerEvent(mockEvent: ethereum.Event, userAddress: string, amount: string): ethereum.Event {
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
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))
    )
  );
  params.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromAddress(Address.fromString(userAddress))
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

function createWithdrawEvent(mockEvent: ethereum.Event, userAddress: string, amount: string): ethereum.Event {
  let event = new StakeAndRewardsWithdrawn(
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
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))
    )
  );
  params.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromAddress(Address.fromString(userAddress))
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
  