"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const TRANSACTION_COLLECTION = 'transaction';
const transactionProjection = {
    _id: 0,
    chainId: 1,
    to: 1,
    data: 1,
    relayId: 1,
    relayType: 1,
    sentDate: 1,
    projectId: 1,
    walletAddress: 1,
    relayContext: 1,
    isSponsored: 1
};
const _getTransactionCollection = () => {
    return (0, mongoService_1.getCollection)(TRANSACTION_COLLECTION);
};
const getTransactionsByProjectId = async (projectId, limit, offset) => {
    return await _getTransactionCollection()
        .find({
        projectId
    }, {
        projection: transactionProjection,
        sort: {
            sentDate: -1
        },
        skip: offset,
        limit: limit
    })
        .toArray();
};
const getTransactionsByProjectIdAndDate = async (projectId, start, end) => {
    return await _getTransactionCollection()
        .find({
        projectId,
        sentDate: {
            $gte: start,
            $lte: end
        }
    }, {
        projection: transactionProjection,
        sort: {
            sentDate: -1
        }
    })
        .toArray();
};
const getTransactionsCountByProjectId = async (projectId) => {
    return await _getTransactionCollection().countDocuments({
        projectId
    });
};
const insertTransaction = async (transaction) => {
    await _getTransactionCollection().insertOne(transaction);
};
exports.default = {
    insertTransaction,
    getTransactionsByProjectId,
    getTransactionsCountByProjectId,
    getTransactionsByProjectIdAndDate,
    TRANSACTION_COLLECTION
};
//# sourceMappingURL=transactionRepository.js.map