"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socialRecoveryService_1 = __importDefault(require("./socialRecoveryService"));
const startRecovery = async (req, res) => {
    const { projectId } = req;
    const { chainId, walletAddress, newOwner, newThreshold, deviceData, publicKeyId, publicKeyX, publicKeyY } = req.body;
    let passkey;
    if (publicKeyId) {
        passkey = {
            deviceData,
            publicKeyId,
            publicKeyX,
            publicKeyY
        };
    }
    await socialRecoveryService_1.default.startRecoveryRequest(projectId, +chainId, walletAddress, newOwner, passkey, newThreshold);
    res.status(200).json({ success: true });
};
const finalizeRecovery = async (req, res) => {
    const { projectId } = req;
    const { walletAddress, chainId } = req.body;
    await socialRecoveryService_1.default.finalizeRecoveryRequest(projectId, chainId, walletAddress);
    res.status(200).json({ success: true });
};
exports.default = {
    startRecovery,
    finalizeRecovery
};
//# sourceMappingURL=socialRecoveryController.js.map