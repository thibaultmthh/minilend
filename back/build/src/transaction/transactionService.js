"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const http_errors_1 = require("http-errors");
const relayService_1 = __importStar(require("../services/relayService/relayService"));
const transactionRepository_1 = __importDefault(require("./transactionRepository"));
const getProjectTransactions = async (projectId, limit, offset) => {
    const transactions = await transactionRepository_1.default.getTransactionsByProjectId(projectId, limit, offset);
    await (0, async_1.eachLimit)(transactions, 20, async (transaction) => {
        transaction.relayInfos = await relayService_1.default.getRelayInfos(transaction.relayId, transaction.chainId, transaction.relayType);
        return transaction;
    });
    return transactions;
};
const getProjectTransactionsByDate = async (projectId, start, end) => {
    return await transactionRepository_1.default.getTransactionsByProjectIdAndDate(projectId, start, end);
};
const getRelayedTransaction = async (relayId, chainId, relayType = relayService_1.RelayerType.COMETH) => {
    const transaction = await relayService_1.default.getRelayInfos(relayId, chainId, relayType);
    if (!transaction) {
        throw (0, http_errors_1.NotFound)(`Relayed Transaction id(${relayId}) not found on chainId(${chainId})`);
    }
    return transaction;
};
exports.default = {
    getRelayedTransaction,
    getProjectTransactions,
    getProjectTransactionsByDate
};
//# sourceMappingURL=transactionService.js.map