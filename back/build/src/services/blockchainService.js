"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const getProvider = (chainId) => {
    return new ethers_1.ethers.providers.StaticJsonRpcProvider(globalConfig_1.default.networks[chainId].RPCUrl);
};
exports.default = {
    getProvider
};
//# sourceMappingURL=blockchainService.js.map