"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sponsoredAddressService_1 = __importDefault(require("./sponsoredAddressService"));
const createSponsoredAddress = async (req, res) => {
    const { projectId, chainId } = req;
    const { targetAddress } = req.body;
    await sponsoredAddressService_1.default.createSponsoredAddress(projectId, targetAddress, chainId);
    res.status(200).json({ success: true });
};
const getProjectSponsoredAddresses = async (req, res) => {
    const { projectId, chainId } = req;
    const sponsoredAddresses = await sponsoredAddressService_1.default.getProjectSponsoredAddresses({
        projectId: projectId,
        chainId
    });
    res.status(200).json({ success: true, sponsoredAddresses });
};
const deleteSponsoredAddress = async (req, res) => {
    const { projectId, chainId } = req;
    const { targetAddress } = req.params;
    await sponsoredAddressService_1.default.deleteSponsoredAddress(projectId, targetAddress, chainId);
    res.status(200).json({ success: true });
};
const areTxSponsored = async (req, res) => {
    const { projectId, chainId } = req;
    const { walletAddress, transactions } = req.body;
    const isSponsored = await sponsoredAddressService_1.default.areTxSponsored({
        projectId,
        chainId,
        walletAddress,
        txs: transactions
    });
    res.status(200).json({ success: true, isSponsored });
};
exports.default = {
    createSponsoredAddress,
    getProjectSponsoredAddresses,
    deleteSponsoredAddress,
    areTxSponsored
};
//# sourceMappingURL=sponsoredAddressController.js.map