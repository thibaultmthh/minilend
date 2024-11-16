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
import { handleDeposit, handleBorrow, handleLiquidationCall } from "../src/LendingPool";
import { Deposit, Borrow, LiquidationCall } from "../generated/LendingPool/LendingPool";

function createAddress(address: string): Address {
  if (!address.startsWith('0x')) {
    address = '0x' + address.padStart(40, '0');
  }
  return Address.fromString(address);
}

describe("LendingPool", () => {
  beforeAll(() => {
    clearStore();
  });

  afterAll(() => {
    clearStore();
  });

  test("Handle Deposit creates proper entities", () => {
    let mockEvent = newMockEvent();
    let depositEvent = new Deposit(
      mockEvent.address,
      mockEvent.logIndex,
      mockEvent.transactionLogIndex,
      mockEvent.logType,
      mockEvent.block,
      mockEvent.transaction,
      new Array<ethereum.EventParam>(),
      mockEvent.receipt
    );

    // Create parameters array first
    let params = new Array<ethereum.EventParam>();
    
    params.push(
      new ethereum.EventParam(
        "reserve",
        ethereum.Value.fromAddress(createAddress("0x5678567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "user",
        ethereum.Value.fromAddress(createAddress("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "onBehalfOf",
        ethereum.Value.fromAddress(createAddress("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "amount",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1000))
      )
    );
    params.push(
      new ethereum.EventParam(
        "referralCode",
        ethereum.Value.fromI32(0)
      )
    );

    // Set parameters
    depositEvent.parameters = params;

    handleDeposit(depositEvent);

    assert.fieldEquals(
      "User",
      "0x1234567890123456789012345678901234567890",
      "totalCollateralETH",
      "0"
    );
    assert.fieldEquals(
      "Reserve",
      "0x5678567890123456789012345678901234567890",
      "totalDeposits",
      "1000"
    );
    assert.fieldEquals(
      "UserReserve",
      "0x1234567890123456789012345678901234567890-0x5678567890123456789012345678901234567890",
      "currentATokenBalance",
      "1000"
    );
  });

  test("Handle Borrow updates user and reserve state", () => {
    let mockEvent = newMockEvent();
    let borrowEvent = new Borrow(
      mockEvent.address,
      mockEvent.logIndex,
      mockEvent.transactionLogIndex,
      mockEvent.logType,
      mockEvent.block,
      mockEvent.transaction,
      new Array<ethereum.EventParam>(),
      mockEvent.receipt
    );

    // Create parameters array first
    let params = new Array<ethereum.EventParam>();
    
    params.push(
      new ethereum.EventParam(
        "reserve",
        ethereum.Value.fromAddress(createAddress("0x5678567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "user",
        ethereum.Value.fromAddress(createAddress("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "onBehalfOf",
        ethereum.Value.fromAddress(createAddress("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "amount",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(500))
      )
    );
    params.push(
      new ethereum.EventParam(
        "borrowRateMode",
        ethereum.Value.fromI32(1)
      )
    );
    params.push(
      new ethereum.EventParam(
        "borrowRate",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(2))
      )
    );
    params.push(
      new ethereum.EventParam(
        "referralCode",
        ethereum.Value.fromI32(0)
      )
    );

    // Set parameters
    borrowEvent.parameters = params;

    handleBorrow(borrowEvent);

    assert.fieldEquals(
      "UserReserve",
      "0x1234567890123456789012345678901234567890-0x5678567890123456789012345678901234567890",
      "currentStableDebt",
      "500"
    );
    assert.fieldEquals(
      "Reserve",
      "0x5678567890123456789012345678901234567890",
      "totalStableBorrows",
      "500"
    );
  });

  test("Handle Liquidation creates liquidation event", () => {
    let mockEvent = newMockEvent();
    let liquidationEvent = new LiquidationCall(
      mockEvent.address,
      mockEvent.logIndex,
      mockEvent.transactionLogIndex,
      mockEvent.logType,
      mockEvent.block,
      mockEvent.transaction,
      new Array<ethereum.EventParam>(),
      mockEvent.receipt
    );

    // Create parameters array first
    let params = new Array<ethereum.EventParam>();
    
    params.push(
      new ethereum.EventParam(
        "user",
        ethereum.Value.fromAddress(createAddress("0x1234567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "collateralAsset",
        ethereum.Value.fromAddress(createAddress("0x5678567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "debtAsset",
        ethereum.Value.fromAddress(createAddress("0x9abc567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "debtToCover",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(100))
      )
    );
    params.push(
      new ethereum.EventParam(
        "liquidatedCollateralAmount",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(120))
      )
    );
    params.push(
      new ethereum.EventParam(
        "liquidator",
        ethereum.Value.fromAddress(createAddress("0xdef0567890123456789012345678901234567890"))
      )
    );
    params.push(
      new ethereum.EventParam(
        "receiveAToken",
        ethereum.Value.fromBoolean(false)
      )
    );

    // Set parameters
    liquidationEvent.parameters = params;

    handleLiquidationCall(liquidationEvent);

    assert.entityCount("LiquidationCall", 1);
    assert.fieldEquals(
      "LiquidationCall",
      mockEvent.transaction.hash.toHexString() + "-" + mockEvent.logIndex.toString(),
      "debtToCover",
      "100"
    );
  });
}); 