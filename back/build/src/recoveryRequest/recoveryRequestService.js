"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recoveryRequestRepository_1 = __importDefault(require("./recoveryRequestRepository"));
const createRecoveryRequest = async (projectId, chainId, walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY, webAuthnDeploymentParams) => {
    await recoveryRequestRepository_1.default.insertRecoveryRequest(projectId, chainId, walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY, webAuthnDeploymentParams);
};
const getRecoveryRequestBySignerAddress = async (projectId, signerAddress, chainId) => {
    return await recoveryRequestRepository_1.default.getRecoveryRequestBySignerAddress(projectId, signerAddress, chainId);
};
const getRecoveryRequestByWalletAddress = async (projectId, walletAddress, chainId) => {
    return await recoveryRequestRepository_1.default.getRecoveryRequestByWalletAddress(projectId, walletAddress, chainId);
};
const deleteRecoveryRequest = async (projectId, chainId, signerAddress) => {
    await recoveryRequestRepository_1.default.deleteRecoveryRequest(projectId, chainId, signerAddress);
};
exports.default = {
    createRecoveryRequest,
    getRecoveryRequestBySignerAddress,
    getRecoveryRequestByWalletAddress,
    deleteRecoveryRequest
};
//# sourceMappingURL=recoveryRequestService.js.map