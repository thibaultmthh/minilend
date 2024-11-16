"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletProjection = void 0;
const mongoService_1 = require("../services/mongoService");
const WALLET_COLLECTION = 'wallet';
exports.walletProjection = {
    _id: 0,
    address: 1,
    chainId: 1,
    initiatorAddress: 1,
    creationDate: 1,
    connectionDate: 1
};
const _getWalletCollection = () => {
    return (0, mongoService_1.getCollection)(WALLET_COLLECTION);
};
const _getWalletCollectionForInsert = () => {
    return (0, mongoService_1.getCollection)(WALLET_COLLECTION);
};
const createOrUpdateWallet = async (projectId, chainId, address, updateDate, initiatorAddress, deploymentParams) => {
    const wallet = (await _getWalletCollectionForInsert().findOneAndUpdate({
        projectId,
        address,
        chainId
    }, {
        $set: {
            connectionDate: updateDate
        },
        $setOnInsert: {
            projectId,
            chainId,
            address,
            creationDate: updateDate,
            initiatorAddress,
            deploymentParams
        }
    }, {
        returnDocument: 'after',
        upsert: true
    })).value;
    return wallet;
};
const getWalletByChain = async (projectId, chainId, address) => {
    const wallet = await _getWalletCollection().findOne({
        projectId,
        chainId,
        address
    });
    return wallet;
};
const getWalletForAllChains = async (projectId, address) => {
    const wallet = await _getWalletCollection()
        .find({
        projectId,
        address
    }, {
        projection: exports.walletProjection
    })
        .toArray();
    return wallet;
};
const getWalletsByProjectId = async (projectId, limit, offset) => {
    const wallets = await _getWalletCollection()
        .find({
        projectId
    }, {
        projection: exports.walletProjection,
        sort: {
            creationDate: -1
        },
        skip: offset,
        limit: limit
    })
        .toArray();
    return wallets;
};
const getWalletByInitiatorAddress = async (projectId, initiatorAddress, chainId) => {
    const wallet = await _getWalletCollection().findOne({
        projectId,
        initiatorAddress,
        chainId
    });
    return wallet;
};
const getWalletsCountByProjectId = async (projectId) => {
    const wallets = await _getWalletCollection().countDocuments({
        projectId
    });
    return wallets;
};
exports.default = {
    createOrUpdateWallet,
    getWalletByChain,
    getWalletForAllChains,
    getWalletsByProjectId,
    getWalletByInitiatorAddress,
    getWalletsCountByProjectId,
    WALLET_COLLECTION
};
//# sourceMappingURL=walletRepository.js.map