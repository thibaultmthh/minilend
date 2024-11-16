"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const walletRepository_1 = __importDefault(require("./walletRepository"));
const walletService_1 = __importDefault(require("./walletService"));
const isValidSignature = async (req, res) => {
    const { projectId } = req;
    const { walletAddress } = req.params;
    const { chainId, message, signature } = req.body;
    const result = await walletService_1.default.isValidSignature(projectId, walletAddress, message, signature, chainId);
    res.status(200).json({ success: true, result });
};
const createWallet = async (req, res) => {
    const { projectId } = req;
    const { initiatorAddress, walletAddress, chainId } = req.body;
    const currentWalletDeploymentParams = await walletService_1.default.currentWalletDeploymentParams(+chainId);
    await walletService_1.default.createOrUpdateWalletInDB(projectId, chainId.toString(), walletAddress, initiatorAddress, currentWalletDeploymentParams);
    res.status(200).json({ success: true });
};
const getWallet = async (req, res) => {
    const { projectId } = req;
    const { chainId, walletAddress } = req.params;
    const wallet = await walletService_1.default.getWallet(projectId, chainId, walletAddress);
    res.status(200).json({ success: true, wallet });
};
const getWalletForAllChains = async (req, res) => {
    const { projectId } = req;
    const { walletAddress } = req.params;
    const wallets = await walletService_1.default.getWalletForAllChains(projectId, walletAddress);
    res.status(200).json({ success: true, wallets });
};
const importExternalSafe = async (req, res) => {
    const { projectId } = req;
    const { chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData } = req.body;
    await walletService_1.default.importExternalSafe(projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData);
    res.status(200).json({
        success: true,
        signerAddress,
        message: 'You can now add this address as owner of your safe !'
    });
};
const getWalletsByProjectId = async (req, res) => {
    const { projectId } = req;
    const limit = parseInt((req.query.limit || '20'));
    const offset = parseInt((req.query.offset || '0'));
    const wallets = await walletService_1.default.getWalletsByProjectId(projectId, limit, offset);
    const totalWallets = await walletRepository_1.default.getWalletsCountByProjectId(projectId);
    const pagination = {
        limit,
        offset,
        total: totalWallets
    };
    res.status(200).json({ success: true, wallets, pagination });
};
exports.default = {
    isValidSignature,
    createWallet,
    getWallet,
    importExternalSafe,
    getWalletForAllChains,
    getWalletsByProjectId
};
//# sourceMappingURL=walletController.js.map