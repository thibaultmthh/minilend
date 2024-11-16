"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionRepository_1 = __importDefault(require("./transactionRepository"));
const transactionService_1 = __importDefault(require("./transactionService"));
const getProjectTransactions = async (req, res) => {
    const projectId = req.params.projectId;
    const limit = parseInt((req.query.limit || '20'));
    const offset = parseInt((req.query.offset || '0'));
    const transactions = await transactionService_1.default.getProjectTransactions(projectId, limit, offset);
    const totalTransactions = await transactionRepository_1.default.getTransactionsCountByProjectId(projectId);
    const pagination = {
        limit,
        offset,
        total: totalTransactions
    };
    res.status(200).json({ success: true, transactions, pagination });
};
const getProjectTransactionsByDate = async (req, res) => {
    const projectId = req.params.projectId;
    const start = new Date(Number(req.query.start) || Date.now());
    const end = new Date(Number(req.query.end) || Date.now());
    const transactions = await transactionService_1.default.getProjectTransactionsByDate(projectId, start, end);
    res.status(200).json({ success: true, transactions });
};
const getRelayedTransaction = async (req, res) => {
    const relayId = req.params.relayId;
    const chainId = req.chainId;
    const relayedTransaction = await transactionService_1.default.getRelayedTransaction(relayId, chainId);
    res.status(200).json({ success: true, relayedTransaction });
};
exports.default = {
    getRelayedTransaction,
    getProjectTransactions,
    getProjectTransactionsByDate
};
//# sourceMappingURL=transactionController.js.map