"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = require("http-errors");
const globalConfig_1 = __importDefault(require("../../config/globalConfig"));
const logger_1 = __importDefault(require("../logger"));
const relaySendTransaction = async (transactionData, contractAddress, chainId, projectId, walletAddress, isSponsored) => {
    const api = axios_1.default.create({
        baseURL: globalConfig_1.default.networks[chainId].comethRelayUrl
    });
    const body = {
        to: contractAddress,
        data: transactionData,
        projectId,
        isSponsored
    };
    try {
        const response = await api.post(`/transactions`, body);
        return response?.data.transactionId;
    }
    catch (error) {
        logger_1.default.warn('Cometh relay Error', error, {
            projectId,
            walletAddress
        });
        throw (0, http_errors_1.BadRequest)('Cometh relay Error');
    }
};
const getRelayInfos = async (relayId, chainId) => {
    const api = axios_1.default.create({
        baseURL: globalConfig_1.default.networks[chainId].comethRelayUrl
    });
    try {
        const response = await api.get(`/transactions/${relayId}`);
        const relayInfos = response.data.transaction;
        if (!relayInfos) {
            throw (0, http_errors_1.NotFound)(`Relayed Transaction id(${relayId}) not found on chainId(${chainId})`);
        }
        return {
            id: relayInfos._id,
            to: relayInfos.to,
            data: relayInfos.data,
            isSponsored: relayInfos.isSponsored,
            status: relayInfos.status
        };
    }
    catch (error) {
        logger_1.default.info('Cometh get relay info Error', error);
        throw (0, http_errors_1.BadRequest)('Cometh get relay info Error');
    }
};
exports.default = { relaySendTransaction, getRelayInfos };
//# sourceMappingURL=comethRelay.js.map