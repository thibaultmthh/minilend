"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSetUpData = exports.encodeMultiSendTransactions = void 0;
const ethers_1 = require("ethers");
const enableModule_json_1 = __importDefault(require("../contracts/abi/enableModule.json"));
const sharedSafeWebAuthnSigner_json_1 = __importDefault(require("../contracts/abi/sharedSafeWebAuthnSigner.json"));
const multicallService_1 = __importDefault(require("../services/multicallService"));
const safeService_1 = __importDefault(require("../services/safeService"));
const { MultiCallInterface } = multicallService_1.default;
const { SafeInterface } = safeService_1.default;
const EnableModuleInterface = new ethers_1.ethers.utils.Interface(enableModule_json_1.default);
const SharedSafeWebAuthnSignerInterface = new ethers_1.ethers.utils.Interface(sharedSafeWebAuthnSigner_json_1.default);
/**
 * Encodes multiple transactions into a single byte string for multi-send functionality
 * @param transactions - Array of MultiSendTransaction objects
 * @returns Concatenated and encoded transactions as a Hex string
 */
const encodeMultiSendTransactions = (transactions) => {
    const encodedTransactions = transactions.map(({ operation, to, value, data }) => {
        return ethers_1.ethers.utils.solidityPack(['uint8', 'address', 'uint256', 'uint256', 'bytes'], [operation, to, value ?? 0, ethers_1.ethers.utils.arrayify(data).length, data]);
    });
    return ethers_1.ethers.utils.hexConcat(encodedTransactions);
};
exports.encodeMultiSendTransactions = encodeMultiSendTransactions;
const getSetUpData = ({ signerAddress, modules, setUpContractAddress, safeWebAuthnSharedSignerContractAddress, safeP256VerifierAddress, x, y }) => {
    const enableModuleCallData = EnableModuleInterface.encodeFunctionData('enableModules', [modules]);
    if (signerAddress === safeWebAuthnSharedSignerContractAddress) {
        const sharedSignerConfigCallData = SharedSafeWebAuthnSignerInterface.encodeFunctionData('configure', [
            { x, y, verifiers: safeP256VerifierAddress }
        ]);
        return MultiCallInterface.encodeFunctionData('multiCall', [
            (0, exports.encodeMultiSendTransactions)([
                {
                    operation: 1,
                    to: setUpContractAddress,
                    data: enableModuleCallData
                },
                {
                    operation: 1,
                    to: safeWebAuthnSharedSignerContractAddress,
                    data: sharedSignerConfigCallData
                }
            ])
        ]);
    }
    return enableModuleCallData;
};
exports.getSetUpData = getSetUpData;
const _getEncodedCreateProxyData = (walletSetUpData, safeSingletonAddress, saltNonce) => {
    return safeService_1.default.createProxyWithNonceEncodeFunctionData({
        safeSingletonAddress: safeSingletonAddress,
        setUpData: walletSetUpData,
        saltNonce: ethers_1.ethers.utils.formatBytes32String(saltNonce)
    });
};
const getSafeInitializer = ({ signerAddress, threshold, fallbackHandler, modules, setUpContractAddress, safeWebAuthnSharedSignerContractAddress, p256Verifier, multisendAddress }) => {
    const setUpData = (0, exports.getSetUpData)({
        signerAddress,
        modules,
        setUpContractAddress: setUpContractAddress,
        safeWebAuthnSharedSignerContractAddress: safeWebAuthnSharedSignerContractAddress,
        safeP256VerifierAddress: p256Verifier
    });
    if (signerAddress !== safeWebAuthnSharedSignerContractAddress) {
        return SafeInterface.encodeFunctionData('setup', [
            [signerAddress],
            threshold,
            setUpContractAddress,
            setUpData,
            fallbackHandler,
            ethers_1.ethers.constants.AddressZero,
            0,
            ethers_1.ethers.constants.AddressZero
        ]);
    }
    return SafeInterface.encodeFunctionData('setup', [
        [safeWebAuthnSharedSignerContractAddress],
        threshold,
        multisendAddress,
        setUpData,
        fallbackHandler,
        ethers_1.ethers.constants.AddressZero,
        0,
        ethers_1.ethers.constants.AddressZero
    ]);
};
const _prepareWalletDeploymentParams = async (wallet) => {
    const initiatorAddress = wallet.initiatorAddress;
    const { setUpContractAddress, safeWebAuthnSharedSignerContractAddress, p256Verifier, multisendAddress, fallbackHandler } = wallet.deploymentParams.safeContractParams;
    const walletSetUpData = getSafeInitializer({
        signerAddress: initiatorAddress,
        threshold: 1,
        fallbackHandler,
        modules: [fallbackHandler],
        setUpContractAddress,
        safeWebAuthnSharedSignerContractAddress,
        p256Verifier,
        multisendAddress
    });
    return { walletSetUpData };
};
const prepareDeploySafeTransactions = async (wallet) => {
    const { walletSetUpData } = await _prepareWalletDeploymentParams(wallet);
    const { safeProxyFactoryAddress, safeSingletonAddress } = wallet.deploymentParams.safeContractParams;
    return [
        {
            target: safeProxyFactoryAddress,
            callData: await _getEncodedCreateProxyData(walletSetUpData, safeSingletonAddress, 'salt')
        }
    ];
};
const prepareDeploySafeTransactionData = async (wallet) => {
    const deploySafeTx = await prepareDeploySafeTransactions(wallet);
    return await multicallService_1.default.generateMulticallTransactionData(deploySafeTx);
};
exports.default = {
    prepareDeploySafeTransactions,
    prepareDeploySafeTransactionData
};
//# sourceMappingURL=safeDeploymentService.js.map