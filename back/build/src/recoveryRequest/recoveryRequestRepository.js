"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const RECOVERY_REQUEST_COLLECTION = 'recovery-request';
const _getRecoveryRequestCollection = () => {
    return (0, mongoService_1.getCollection)(RECOVERY_REQUEST_COLLECTION);
};
const insertRecoveryRequest = async (projectId, chainId, walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY, webAuthnDeploymentParams) => {
    await _getRecoveryRequestCollection().findOneAndUpdate({
        projectId,
        chainId,
        signerAddress
    }, {
        $setOnInsert: {
            projectId,
            chainId,
            walletAddress,
            signerAddress,
            deviceData,
            type,
            publicKeyId,
            publicKeyX,
            publicKeyY,
            deploymentParams: webAuthnDeploymentParams,
            creationDate: new Date()
        }
    }, {
        upsert: true
    });
};
const getRecoveryRequestBySignerAddress = async (projectId, signerAddress, chainId) => {
    const recoveryRequest = await _getRecoveryRequestCollection().findOne({
        projectId,
        signerAddress,
        chainId
    });
    return recoveryRequest;
};
const getRecoveryRequestByWalletAddress = async (projectId, walletAddress, chainId) => {
    const recoveryRequest = await _getRecoveryRequestCollection()
        .find({
        projectId,
        walletAddress,
        chainId
    })
        .toArray();
    return recoveryRequest;
};
const deleteRecoveryRequest = async (projectId, chainId, signerAddress) => {
    await _getRecoveryRequestCollection().findOneAndDelete({
        projectId,
        chainId,
        signerAddress
    });
};
exports.default = {
    insertRecoveryRequest,
    getRecoveryRequestBySignerAddress,
    getRecoveryRequestByWalletAddress,
    deleteRecoveryRequest,
    RECOVERY_REQUEST_COLLECTION
};
//# sourceMappingURL=recoveryRequestRepository.js.map