import { Address, BigDecimal, BigInt, TypedMap } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const BscChainID = BigInt.fromString("56");

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);
export const BYTES_ONE = Address.fromI32(1);
export const MIN_BD = BigDecimal.fromString("0.000000000000000001");
let BI_10_18 = BigInt.fromI32(10).pow(18);
export const BD_10_18 = BI_10_18.toBigDecimal();

export const NameBNB = "BNB";
export const SymbolBNB = "BNB";

export let CORE_WHITELIST_MAP = new TypedMap<Address, Address>();

export const WBNB_ORACLE = Address.fromString(
  "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE"
);
const ETH_ORACLE = Address.fromString(
  "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e"
);
export const USDC_ORACLE = Address.fromString(
  "0x51597f405303c4377e36123cbc172b13269ea163"
);
const USDT_ORACLE = Address.fromString(
  "0xb97ad0e74fa7d920791e90258a6e2085088b4320"
);
const TUSD_ORACLE = Address.fromString(
  "0xa3334a9762090e827413a7495afece76f41dfc06"
);
const USDD_ORACLE = Address.fromString(
  "0x51c78c299c42b058bf11d47fbb74ac437c6a0c8c"
);

const WBNB = Address.fromString("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
const TUSD = Address.fromString("0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9");
const USDD = Address.fromString("0xd17479997F34dd9156Deef8F95A52D81D265be9c");
const WBinanceBeaconEth = Address.fromString(
  "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e"
);
export const BinancePegUSDC = Address.fromString(
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
);
const BinancePegUSDT = Address.fromString(
  "0x55d398326f99059fF775485246999027B3197955"
);

CORE_WHITELIST_MAP.set(WBNB, WBNB_ORACLE);
CORE_WHITELIST_MAP.set(Address.fromString(ADDRESS_ZERO), WBNB_ORACLE);
CORE_WHITELIST_MAP.set(WBinanceBeaconEth, ETH_ORACLE);
CORE_WHITELIST_MAP.set(TUSD, TUSD_ORACLE);
CORE_WHITELIST_MAP.set(USDD, USDD_ORACLE);
CORE_WHITELIST_MAP.set(BinancePegUSDC, USDC_ORACLE);
CORE_WHITELIST_MAP.set(BinancePegUSDT, USDT_ORACLE);
