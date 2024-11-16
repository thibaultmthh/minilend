"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitCode = exports.getFeeEstimation = exports.packPaymasterData = exports.packAccountGasLimits = exports.unpackAccountGasLimits = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const paymasterContractService_1 = __importDefault(require("./paymasterContractService"));
const entryPoint = '0x0000000071727De22E5E9d8BAf0edAc6f37da032';
function unpackAccountGasLimits(accountGasLimits) {
    return {
        verificationGasLimit: parseInt(accountGasLimits.slice(2, 34), 16),
        callGasLimit: parseInt(accountGasLimits.slice(34), 16)
    };
}
exports.unpackAccountGasLimits = unpackAccountGasLimits;
function packAccountGasLimits(verificationGasLimit, callGasLimit) {
    return ethers_1.ethers.utils.hexConcat([
        (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(verificationGasLimit, { hexPad: 'left' }), 16),
        (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(callGasLimit, { hexPad: 'left' }), 16)
    ]);
}
exports.packAccountGasLimits = packAccountGasLimits;
function packPaymasterData(paymaster, paymasterVerificationGasLimit, postOpGasLimit, paymasterData) {
    return ethers_1.ethers.utils.hexConcat([
        paymaster,
        (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(paymasterVerificationGasLimit, { hexPad: 'left' }), 16),
        (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(postOpGasLimit, { hexPad: 'left' }), 16),
        paymasterData
    ]);
}
exports.packPaymasterData = packPaymasterData;
async function getFeeEstimation(userOperation, chainId) {
    const bundler = new providers_1.JsonRpcProvider(globalConfig_1.default.networks[chainId].bundlerUrl);
    return await bundler.send('eth_estimateUserOperationGas', [
        userOperation,
        entryPoint
    ]);
}
exports.getFeeEstimation = getFeeEstimation;
function getInitCode(unpackedUserOperation) {
    return unpackedUserOperation.factory
        ? (0, utils_1.hexConcat)([
            unpackedUserOperation.factory,
            unpackedUserOperation.factoryData || '0x'
        ])
        : '0x';
}
exports.getInitCode = getInitCode;
const validateUserOpsSponsoring = async (chainId, userOperation) => {
    const gasEstimation = await getFeeEstimation(userOperation, chainId);
    const validUntil = 0x00000000deadbeef;
    const validAfter = 0x0000000000001234;
    const paymasterVerificationGasLimit = ethers_1.ethers.utils.hexlify(BigInt(600000));
    const paymasterPostOpGasLimit = ethers_1.ethers.utils.hexlify(BigInt(1));
    const paymaster = globalConfig_1.default.networks[chainId]
        .verifyingPaymasterAddress;
    const paymasterData = (0, utils_1.hexConcat)([
        utils_1.defaultAbiCoder.encode(['uint48', 'uint48'], [validAfter, validUntil]),
        `0x${'00'.repeat(65)}`
    ]);
    const packedUserOp = {
        callData: userOperation.callData,
        nonce: userOperation.nonce,
        initCode: getInitCode(userOperation),
        paymasterAndData: packPaymasterData(paymaster, paymasterVerificationGasLimit, paymasterPostOpGasLimit, paymasterData),
        preVerificationGas: gasEstimation.preVerificationGas,
        sender: userOperation.sender,
        accountGasLimits: packAccountGasLimits(gasEstimation.verificationGasLimit, gasEstimation.callGasLimit),
        gasFees: packAccountGasLimits(userOperation.maxPriorityFeePerGas, userOperation.maxFeePerGas),
        signature: userOperation.signature
    };
    const hash = await paymasterContractService_1.default.getHash(chainId, packedUserOp, validUntil, validAfter);
    const paymasterSigner = new ethers_1.Wallet(globalConfig_1.default.networks[chainId].paymasterSigner);
    const signature = await paymasterSigner.signMessage((0, utils_1.arrayify)(hash));
    return {
        paymaster: paymaster,
        paymasterData: ethers_1.ethers.utils.solidityPack(['bytes', 'bytes'], [
            utils_1.defaultAbiCoder.encode(['uint48', 'uint48'], [validUntil, validAfter]),
            signature
        ]),
        paymasterPostOpGasLimit: paymasterPostOpGasLimit,
        paymasterVerificationGasLimit: paymasterVerificationGasLimit,
        hash: hash,
        signature: signature,
        preVerificationGas: userOperation.preVerificationGas,
        verificationGasLimit: userOperation.verificationGasLimit,
        callGasLimit: userOperation.callGasLimit
    };
};
exports.default = {
    validateUserOpsSponsoring
};
//# sourceMappingURL=verifyingPaymasterService.js.map