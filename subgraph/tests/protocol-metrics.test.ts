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
import { handleSuppliedToLendingPlatform } from "../src/USDCStaking";
import { SuppliedToLendingPlatform } from "../generated/USDCStaking/USDCStaking";

describe("Protocol Metrics", () => {
  beforeAll(() => {
    clearStore();
  });

  afterAll(() => {
    clearStore();
  });

  test("Protocol metrics are updated on stake", () => {
    let mockEvent = newMockEvent();
    let stakeEvent = new SuppliedToLendingPlatform(
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
        ethereum.Value.fromAddress(Address.fromString("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "amount",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1000))
      )
    );

    stakeEvent.parameters = params;
    handleSuppliedToLendingPlatform(stakeEvent);

    assert.fieldEquals(
      "ProtocolMetrics",
      "singleton",
      "totalStaked",
      "1000"
    );
    assert.fieldEquals(
      "ProtocolMetrics",
      "singleton",
      "totalUsers",
      "1"
    );
  });
}); 