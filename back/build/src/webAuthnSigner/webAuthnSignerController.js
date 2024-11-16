"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const createWebAuthnSigner = async (req, res) => {
    const { projectId } = req;
    const { chainId, walletAddress, publicKeyId, publicKeyX, publicKeyY, deviceData, signerAddress, isSharedWebAuthnSigner } = req.body;
    const currentWebAuthnDeploymentParams = webAuthnSignerService_1.default.currentWebAuthnDeploymentParams(+chainId);
    await webAuthnSignerService_1.default.createWebAuthnSigner({
        projectId,
        chainId: +chainId,
        walletAddress,
        publicKeyId,
        publicKeyX,
        publicKeyY,
        deviceData,
        isSharedWebAuthnSigner,
        signerAddress,
        webAuthnDeploymentParams: currentWebAuthnDeploymentParams
    });
    res.status(200).json({ success: true });
};
const getProjectWebAuthnSignersByWalletAddress = async (req, res) => {
    const { projectId } = req;
    const { walletAddress } = req.params;
    const webAuthnSigners = await webAuthnSignerService_1.default.getProjectWebAuthnSignersByWalletAddress(projectId, walletAddress);
    res.status(200).json({ success: true, webAuthnSigners });
};
const getProjectWebAuthnSignersByWalletAddressAndChainId = async (req, res) => {
    const { projectId } = req;
    const { walletAddress, chainId } = req.params;
    const webAuthnSigners = await webAuthnSignerService_1.default.getProjectWebAuthnSignersByWalletAddressAndChainId(projectId, walletAddress, +chainId);
    res.status(200).json({ success: true, webAuthnSigners });
};
const getProjectWebAuthnSignerByPublicKeyId = async (req, res) => {
    const { projectId } = req;
    const { publicKeyId } = req.params;
    const webAuthnSigners = await webAuthnSignerService_1.default.getProjectWebAuthnSignerByPublicKeyId(projectId, publicKeyId);
    res.status(200).json({ success: true, webAuthnSigners });
};
const predictWebAuthnSignerAddress = async (req, res) => {
    const { chainId } = req;
    const { publicKeyX, publicKeyY } = req.body;
    const signerAddress = await webAuthnSignerService_1.default.predictSignerAddress(publicKeyX, publicKeyY, chainId);
    res.status(200).json({ success: true, signerAddress });
};
exports.default = {
    createWebAuthnSigner,
    getProjectWebAuthnSignersByWalletAddress,
    getProjectWebAuthnSignerByPublicKeyId,
    predictWebAuthnSignerAddress,
    getProjectWebAuthnSignersByWalletAddressAndChainId
};
//# sourceMappingURL=webAuthnSignerController.js.map