"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const recoveryRequestService_1 = __importDefault(require("./recoveryRequestService"));
const recoveryRequestTypes_1 = require("./recoveryRequestTypes");
const createRecoveryRequest = async (req, res) => {
    const { projectId, chainId } = req;
    const { walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY } = req.body;
    const currentWebAuthnDeploymentParams = webAuthnSignerService_1.default.currentWebAuthnDeploymentParams(chainId);
    if (type === recoveryRequestTypes_1.SignerType.WEBAUTHN) {
        const computedSignerAddress = await webAuthnSignerService_1.default.predictSignerAddress(publicKeyX, publicKeyY, chainId);
        if (signerAddress !== computedSignerAddress) {
            throw new Error('signer address does not correspond to parameters publicKeyX and publicKeyY');
        }
    }
    await recoveryRequestService_1.default.createRecoveryRequest(projectId, chainId.toString(), walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY, currentWebAuthnDeploymentParams);
    res.status(200).json({ success: true });
};
const getRecoveryRequestByWalletAddress = async (req, res) => {
    const { projectId, chainId } = req;
    const walletAddress = req.params.walletAddress;
    const signerRequests = await recoveryRequestService_1.default.getRecoveryRequestByWalletAddress(projectId, walletAddress, chainId.toString());
    res.status(200).json({ success: true, signerRequests });
};
const deleteRecoveryRequest = async (req, res) => {
    const { projectId, chainId } = req;
    const signerAddress = req.params.signerAddress;
    await recoveryRequestService_1.default.deleteRecoveryRequest(projectId, chainId.toString(), signerAddress);
    res.status(200).json({ success: true });
};
const validateRecoveryRequest = async (req, res) => {
    const { projectId, chainId } = req;
    const { walletAddress, signerAddress, deviceData, type, publicKeyId, publicKeyX, publicKeyY } = req.body;
    const recoveryRequest = await recoveryRequestService_1.default.getRecoveryRequestBySignerAddress(projectId, signerAddress, chainId.toString());
    if (!recoveryRequest)
        throw new Error('new signer request does not exist');
    await recoveryRequestService_1.default.deleteRecoveryRequest(projectId, chainId.toString(), signerAddress);
    if (type === recoveryRequestTypes_1.SignerType.WEBAUTHN) {
        if (!recoveryRequest.deploymentParams)
            throw new Error('no webAuthnDeploymentParams in wallet object');
        await webAuthnSignerService_1.default.deployWebAuthnSigner(projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData, recoveryRequest.deploymentParams);
    }
    res.status(200).json({ success: true });
};
exports.default = {
    createRecoveryRequest,
    getRecoveryRequestByWalletAddress,
    deleteRecoveryRequest,
    validateRecoveryRequest
};
//# sourceMappingURL=recoveryRequestController.js.map