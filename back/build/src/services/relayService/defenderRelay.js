"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defender_relay_client_1 = require("@openzeppelin/defender-relay-client");
const http_errors_1 = require("http-errors");
const globalConfig_1 = __importDefault(require("../../config/globalConfig"));
const logger_1 = __importDefault(require("../logger"));
const relaySendTransaction = async (transactionData, contractAddress, chainId, projectId, walletAddress) => {
    const relayer = new defender_relay_client_1.Relayer({
        apiKey: globalConfig_1.default.networks[chainId].defenderApiKey,
        apiSecret: globalConfig_1.default.networks[chainId].defenderApiSecret
    });
    const tx = {
        to: contractAddress,
        data: transactionData,
        gasLimit: 1500000,
        speed: 'fast'
    };
    try {
        const txReturn = await relayer.sendTransaction(tx);
        return txReturn.transactionId;
    }
    catch (error) {
        logger_1.default.warn('Defender Error', error, {
            projectId,
            walletAddress
        });
        throw (0, http_errors_1.BadRequest)('Defender Error');
    }
};
exports.default = { relaySendTransaction };
//# sourceMappingURL=defenderRelay.js.map