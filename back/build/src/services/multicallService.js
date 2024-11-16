"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const multicall_json_1 = __importDefault(require("../contracts/abi/multicall.json"));
const MultiCallInterface = new ethers_1.ethers.utils.Interface(multicall_json_1.default);
const generateMulticallTransactionData = async (calls) => {
    return MultiCallInterface.encodeFunctionData('aggregate', [calls]);
};
exports.default = {
    MultiCallInterface,
    generateMulticallTransactionData
};
//# sourceMappingURL=multicallService.js.map