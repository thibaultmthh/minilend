"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comethRelay_1 = __importDefault(require("../../services/relayService/comethRelay"));
const relaySendTransaction = async (transactionData, contractAddress, chainId, walletAddress, projectId, isSponsored = true) => {
    return await comethRelay_1.default.relaySendTransaction(transactionData, contractAddress, chainId, projectId, walletAddress, isSponsored);
};
const getRelayInfos = async (relayId, chainId) => {
    return await comethRelay_1.default.getRelayInfos(relayId, chainId);
};
exports.default = { relaySendTransaction, getRelayInfos };
//# sourceMappingURL=relayService.js.map