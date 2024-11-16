"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const http_errors_1 = require("http-errors");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const safeService_1 = __importDefault(require("../services/safeService"));
const enableModule_json_1 = __importDefault(require("../contracts/abi/enableModule.json"));
const sponsoredAddressRepository_1 = __importDefault(require("./sponsoredAddressRepository"));
const sponsoredAddressTypes_1 = require("./sponsoredAddressTypes");
const createSponsoredAddress = async (projectId, targetAddress, chainId) => {
    const isAlreadySponsoredAddress = await _isContractSponsorisedByProject(projectId, targetAddress, chainId);
    if (isAlreadySponsoredAddress) {
        throw (0, http_errors_1.BadRequest)('Address is already a sponsored address for this chain');
    }
    else {
        await sponsoredAddressRepository_1.default.insertSponsoredAddress(projectId, targetAddress, chainId);
    }
};
const getProjectSponsoredAddresses = async ({ projectId, chainId, limit, offset }) => {
    const sponsoredAddressByProjectId = await sponsoredAddressRepository_1.default.getSponsoredAddressesByProjectId(projectId, chainId, limit, offset);
    const globalSponsoredAddresses = globalConfig_1.default.networks[chainId].globalSponsoredAddresses.map((address) => {
        return {
            targetAddress: address,
            chainId,
            isGlobal: true
        };
    });
    return sponsoredAddressByProjectId
        ? sponsoredAddressByProjectId.concat(globalSponsoredAddresses)
        : globalSponsoredAddresses;
};
const isSponsoredAddress = async (projectId, functionSelector, walletAddress, targetAddress, chainId, previousData, previousFunctionSelector) => {
    const isTxSponsorisedByDefault = await _isTxSponsorisedByDefault(chainId, functionSelector, walletAddress, targetAddress, globalConfig_1.default.networks[chainId].moduleFactoryAddress, previousData, previousFunctionSelector);
    const isContractSponsorisedByProject = await _isContractSponsorisedByProject(projectId, targetAddress, chainId);
    if (isTxSponsorisedByDefault || isContractSponsorisedByProject)
        return true;
    return false;
};
const _isContractSponsorisedByProject = async (projectId, targetAddress, chainId) => {
    const projectSponsoredAddresses = await getProjectSponsoredAddresses({
        projectId,
        chainId
    });
    const isSponsoredAddress = projectSponsoredAddresses?.find((sponsoredAddress) => sponsoredAddress.targetAddress.toLowerCase() ===
        targetAddress.toLowerCase());
    return isSponsoredAddress ? true : false;
};
const _isTxSponsorisedByDefault = async (chainId, functionSelector, walletAddress, targetAddress, delayModuleFactoryAddress, previousData, previousFunctionSelector) => {
    if ((functionSelector ===
        sponsoredAddressTypes_1.DefaultSponsoredFunctions.ADD_OWNER_FUNCTION_SELECTOR ||
        functionSelector ===
            sponsoredAddressTypes_1.DefaultSponsoredFunctions.REMOVE_OWNER_FUNCTION_SELECTOR) &&
        targetAddress === walletAddress)
        return true;
    if (functionSelector ===
        sponsoredAddressTypes_1.DefaultSponsoredFunctions.SET_DELAY_TX_NONCE_SELECTOR &&
        (await safeService_1.default.isModuleEnabled(walletAddress, chainId, targetAddress)))
        return true;
    if (functionSelector ===
        sponsoredAddressTypes_1.DefaultSponsoredFunctions.ENABLE_MODULE_FUNCTION_SELECTOR) {
        if (targetAddress === walletAddress)
            return true;
        else if (previousFunctionSelector ===
            sponsoredAddressTypes_1.DefaultSponsoredFunctions.ENABLE_MODULE_FUNCTION_SELECTOR &&
            targetAddress === previousData)
            return true;
        else if (await safeService_1.default.isModuleEnabled(walletAddress, chainId, targetAddress))
            return true;
    }
    if (functionSelector ===
        sponsoredAddressTypes_1.DefaultSponsoredFunctions.DISABLE_MODULE_FUNCTION_SELECTOR) {
        if (await safeService_1.default.isModuleEnabled(walletAddress, chainId, targetAddress))
            return true;
    }
    if (functionSelector ===
        sponsoredAddressTypes_1.DefaultSponsoredFunctions.DEPLOY_DELAY_MODULE_FUNCTION_SELECTOR &&
        targetAddress === delayModuleFactoryAddress)
        return true;
    return false;
};
const deleteSponsoredAddress = async (projectId, targetAddress, chainId) => {
    await sponsoredAddressRepository_1.default.deleteSponsoredAddress(projectId, targetAddress, chainId);
};
const areTxSponsored = async ({ projectId, chainId, walletAddress, txs }) => {
    let previousFunctionSelector = undefined;
    let previousData = undefined;
    for (let i = 0; i < txs.length; i++) {
        const functionSelector = txs[i].data.toString().slice(0, 10);
        if (!(await isSponsoredAddress(projectId, functionSelector, walletAddress, txs[i].to, chainId, previousData, previousFunctionSelector))) {
            return false;
        }
        previousFunctionSelector = functionSelector;
        if (previousFunctionSelector ===
            sponsoredAddressTypes_1.DefaultSponsoredFunctions.ENABLE_MODULE_FUNCTION_SELECTOR) {
            const enableModule = new ethers_1.ethers.utils.Interface(enableModule_json_1.default);
            const decodeData = enableModule.decodeFunctionData('enableModules', txs[i].data);
            previousData = decodeData[0];
        }
    }
    return true;
};
exports.default = {
    createSponsoredAddress,
    getProjectSponsoredAddresses,
    isSponsoredAddress,
    deleteSponsoredAddress,
    areTxSponsored
};
//# sourceMappingURL=sponsoredAddressService.js.map