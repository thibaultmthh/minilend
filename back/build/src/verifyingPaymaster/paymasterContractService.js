"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const blockchainService_1 = __importDefault(require("../services/blockchainService"));
const VerifyingPaymaster_json_1 = __importDefault(require("../contracts/abi/VerifyingPaymaster.json"));
const getHash = async (chainId, userOperation, validUntil, validAfter) => {
    const provider = blockchainService_1.default.getProvider(chainId);
    const paymasterAddress = globalConfig_1.default.networks[chainId].verifyingPaymasterAddress;
    const paymasterContract = new ethers_1.Contract(paymasterAddress, VerifyingPaymaster_json_1.default, provider);
    return await paymasterContract.getHash(userOperation, validUntil, validAfter);
};
exports.default = {
    getHash
};
//# sourceMappingURL=paymasterContractService.js.map