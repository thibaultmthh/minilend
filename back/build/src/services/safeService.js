"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP1271_MAGICVALUE = exports.EIP1271_ABI = void 0;
const api_kit_1 = __importDefault(require("@safe-global/api-kit"));
const protocol_kit_1 = __importStar(require("@safe-global/protocol-kit"));
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const safe_json_1 = __importDefault(require("../contracts/abi/safe.json"));
const safeProxyFactory_json_1 = __importDefault(require("../contracts/abi/safeProxyFactory.json"));
const blockchainService_1 = __importDefault(require("./blockchainService"));
const googleCloudKmsService_1 = __importDefault(require("./googleCloudKmsService"));
const logger_1 = __importDefault(require("./logger"));
exports.EIP1271_ABI = [
    'function isValidSignature(bytes data, bytes _signature) public view returns (bytes4)'
];
exports.EIP1271_MAGICVALUE = '0x20c13b0b';
const EIP712_SAFE_MESSAGE_TYPE = {
    // "SafeMessage(bytes message)"
    SafeMessage: [{ type: 'bytes', name: 'message' }]
};
const EIP712_SAFE_TX_TYPES = {
    SafeTx: [
        { type: 'address', name: 'to' },
        { type: 'uint256', name: 'value' },
        { type: 'bytes', name: 'data' },
        { type: 'uint8', name: 'operation' },
        { type: 'uint256', name: 'safeTxGas' },
        { type: 'uint256', name: 'baseGas' },
        { type: 'uint256', name: 'gasPrice' },
        { type: 'address', name: 'gasToken' },
        { type: 'address', name: 'refundReceiver' },
        { type: 'uint256', name: 'nonce' }
    ]
};
const SafeInterface = new ethers_1.ethers.utils.Interface(safe_json_1.default);
const SafeFactoryInterface = new ethers_1.ethers.utils.Interface(safeProxyFactory_json_1.default);
const isValidSignature = async (walletAddress, message, signature, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const walletContract = new ethers_1.Contract(walletAddress, exports.EIP1271_ABI, provider);
    const encodedMessage = ethers_1.ethers.utils.toUtf8Bytes(message);
    try {
        const res = await walletContract.isValidSignature(encodedMessage, signature);
        return res === exports.EIP1271_MAGICVALUE;
    }
    catch (error) {
        logger_1.default.info('isValidSignature: ', error, {
            walletAddress: walletAddress,
            message: message,
            signature: signature
        });
        return false;
    }
};
const isDeployed = async (safeAddress, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(safeAddress, safe_json_1.default, provider);
    try {
        await safe.deployed();
        return true;
    }
    catch (error) {
        return false;
    }
};
const predictSafeAddress = async (setUpData, saltNonce, chainId, safeProxyFactoryAddress, safeSingletonAddress) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safeFactory = new ethers_1.Contract(safeProxyFactoryAddress, safeProxyFactory_json_1.default, provider);
    const proxyCreationCode = await safeFactory.proxyCreationCode();
    const deploymentCode = ethers_1.ethers.utils.solidityPack(['bytes', 'uint256'], [proxyCreationCode, safeSingletonAddress]);
    const salt = ethers_1.ethers.utils.solidityKeccak256(['bytes', 'uint256'], [ethers_1.ethers.utils.solidityKeccak256(['bytes'], [setUpData]), saltNonce]);
    return ethers_1.ethers.utils.getCreate2Address(safeProxyFactoryAddress, salt, ethers_1.ethers.utils.keccak256(deploymentCode));
};
const getOwners = async (chainId, walletAddress) => {
    if (!walletAddress)
        return undefined;
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(walletAddress, safe_json_1.default, provider);
    try {
        await isDeployed(walletAddress, chainId);
        return await safe.getOwners();
    }
    catch {
        return undefined;
    }
};
const getThreshold = async (walletAddress, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(walletAddress, safe_json_1.default, provider);
    return (await safe.getThreshold()).toNumber();
};
const getNonce = async (walletAddress, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(walletAddress, safe_json_1.default, provider);
    return (await safe.nonce()).toNumber();
};
const isModuleEnabled = async (walletAddress, chainId, moduleAddress) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(walletAddress, safe_json_1.default, provider);
    return await safe.isModuleEnabled(moduleAddress);
};
const proposeTransaction = async (safeAddress, safeTransactionData, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const ethAdapter = new protocol_kit_1.EthersAdapter({
        ethers: ethers_1.ethers,
        signerOrProvider: provider
    });
    const txServiceUrl = globalConfig_1.default.networks[chainId].safeServiceUrl;
    const safeService = new api_kit_1.default({ txServiceUrl, ethAdapter });
    // we get the nonce from safe service to be able to have a queue of pending transactions
    const nonce = await safeService.getNextNonce(safeAddress);
    safeTransactionData.nonce = nonce;
    const safeSdk = await protocol_kit_1.default.create({ ethAdapter, safeAddress });
    const safeTransaction = await safeSdk.createTransaction({
        safeTransactionData
    });
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    const senderSignature = await googleCloudKmsService_1.default.signMessage(safeTxHash);
    try {
        await safeService.proposeTransaction({
            safeAddress,
            safeTransactionData: safeTransaction.data,
            safeTxHash,
            senderAddress: ethers_1.ethers.utils.getAddress(
            // senderAddress need to be in case sensitive format
            await googleCloudKmsService_1.default.getAddress()),
            senderSignature
        });
    }
    catch (error) {
        throw new Error(`Error while proposing the transaction to Safe service:${error}`);
    }
};
const setUpEncodeFunctionData = (transactionData) => {
    return SafeInterface.encodeFunctionData('setup', [
        transactionData.owners,
        transactionData.threshold,
        transactionData.to,
        transactionData.data,
        transactionData.fallbackHandler,
        transactionData.paymentToken,
        transactionData.payment,
        transactionData.paymentReceiver
    ]);
};
const execEncodeFunctionData = async (transactionData) => {
    return SafeInterface.encodeFunctionData('execTransaction', [
        transactionData.to,
        transactionData.value,
        transactionData.data,
        transactionData.operation,
        transactionData.safeTxGas,
        transactionData.baseGas,
        transactionData.gasPrice,
        transactionData.gasToken,
        transactionData.refundReceiver,
        transactionData.signatures
    ]);
};
const createProxyWithNonceEncodeFunctionData = async (transactionData) => {
    return SafeFactoryInterface.encodeFunctionData('createProxyWithNonce', [
        transactionData.safeSingletonAddress,
        transactionData.setUpData,
        transactionData.saltNonce
    ]);
};
const isSafeOwner = async (walletAddress, signerAddress, chainId) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const safe = new ethers_1.Contract(walletAddress, safe_json_1.default, provider);
    if ((await isDeployed(walletAddress, chainId)) === true) {
        return await safe.isOwner(signerAddress);
    }
    else {
        throw new Error('Safe not deployed');
    }
};
exports.default = {
    EIP712_SAFE_MESSAGE_TYPE,
    EIP712_SAFE_TX_TYPES,
    SafeInterface,
    isValidSignature,
    isDeployed,
    predictSafeAddress,
    getOwners,
    getThreshold,
    getNonce,
    proposeTransaction,
    setUpEncodeFunctionData,
    execEncodeFunctionData,
    createProxyWithNonceEncodeFunctionData,
    isSafeOwner,
    isModuleEnabled
};
//# sourceMappingURL=safeService.js.map