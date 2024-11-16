"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const WEBAUTHN_SIGNER_COLLECTION = 'webAuthnSigner';
const _getWebAuthnSignerCollection = () => {
    return (0, mongoService_1.getCollection)(WEBAUTHN_SIGNER_COLLECTION);
};
const createWebAuthnSigner = async ({ projectId, chainId, smartAccountAddress, publicKeyId, publicKeyX, publicKeyY, signerAddress, deviceData, webAuthnDeploymentParams, isSharedWebAuthnSigner }) => {
    await _getWebAuthnSignerCollection().insertOne({
        projectId,
        chainId: chainId.toString(),
        smartAccountAddress,
        publicKeyId,
        publicKeyX,
        publicKeyY,
        signerAddress,
        deviceData,
        deploymentParams: webAuthnDeploymentParams,
        isSharedWebAuthnSigner: isSharedWebAuthnSigner,
        creationDate: new Date()
    });
};
const getProjectWebAuthnSignersByWalletAddress = async (projectId, smartAccountAddress) => {
    const filter = {
        projectId,
        smartAccountAddress
    };
    return await _getWebAuthnSignerCollection().find(filter).toArray();
};
const getProjectWebAuthnSignersByWalletAddressAndChain = async (projectId, chainId, smartAccountAddress) => {
    const filter = {
        projectId,
        chainId: chainId.toString(),
        smartAccountAddress
    };
    return await _getWebAuthnSignerCollection().find(filter).toArray();
};
const getProjectWebAuthnSignerByPublicKeyId = async (projectId, publicKeyId, chainId) => {
    const webAuthnSigners = await _getWebAuthnSignerCollection().findOne({
        projectId,
        publicKeyId,
        chainId: chainId.toString()
    });
    return webAuthnSigners;
};
const getProjectWebAuthnSignerBySignerAddressAndChain = async (projectId, signerAddress, chainId) => {
    const webAuthnSigners = await _getWebAuthnSignerCollection().findOne({
        projectId,
        signerAddress,
        chainId: chainId.toString()
    });
    return webAuthnSigners;
};
const getProjectWebAuthnSignerBySignerAddress = async (projectId, signerAddress) => {
    const webAuthnSigners = await _getWebAuthnSignerCollection()
        .find({
        projectId,
        signerAddress
    })
        .toArray();
    return webAuthnSigners;
};
exports.default = {
    createWebAuthnSigner,
    getProjectWebAuthnSignersByWalletAddress,
    getProjectWebAuthnSignerByPublicKeyId,
    getProjectWebAuthnSignerBySignerAddressAndChain,
    getProjectWebAuthnSignerBySignerAddress,
    getProjectWebAuthnSignersByWalletAddressAndChain,
    WEBAUTHN_SIGNER_COLLECTION
};
//# sourceMappingURL=webAuthnSignerRepository.js.map