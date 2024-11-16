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
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const http_errors_1 = require("http-errors");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const delayModuleService = __importStar(require("../services/delayModuleService"));
const googleCloudKmsService_1 = __importDefault(require("../services/googleCloudKmsService"));
const logger_1 = __importDefault(require("../services/logger"));
const relayService_1 = __importDefault(require("../services/relayService/relayService"));
const safeService_1 = __importDefault(require("../services/safeService"));
const walletRepository_1 = __importDefault(require("../wallet/walletRepository"));
const webAuthnSignerRepository_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerRepository"));
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const { EIP712_SAFE_TX_TYPES } = safeService_1.default;
const _validateWalletState = async (projectId, chainId, wallet, requireDeployment = true) => {
    if (wallet.projectId.toString() !== projectId)
        throw (0, http_errors_1.BadRequest)(`This walletAddress does not belong to this projectId`);
    const isDeployed = await safeService_1.default.isDeployed(wallet.address, chainId);
    if (requireDeployment && !isDeployed) {
        throw (0, http_errors_1.BadRequest)(`This walletAddress is not deployed on chainId ${chainId}`);
    }
    return { isDeployed };
};
const startRecovery = async (projectId, chainId, walletAddress, newOwners, newThreshold) => {
    const wallet = await walletRepository_1.default.getWalletByChain(projectId, chainId.toString(), walletAddress);
    if (!wallet)
        throw new http_errors_1.NotFound('wallet not found for this project');
    const { isDeployed: walletIsDeployed } = await _validateWalletState(projectId, chainId, wallet, false);
    if (!walletIsDeployed) {
        throw (0, http_errors_1.BadRequest)('Safe is not yet deployed');
    }
    if (newThreshold > newOwners.length)
        throw (0, http_errors_1.BadRequest)('threshold is greater than the owners list');
    if (!googleCloudKmsService_1.default.isGcpKmsSetup())
        throw (0, http_errors_1.BadRequest)(`GCP KMS not configured, cannot start a recovery`);
    logger_1.default.info('wallet deployment params', wallet.deploymentParams);
    const context = {
        moduleAddress: globalConfig_1.default.networks[chainId].delayModuleAddress,
        moduleFactoryAddress: globalConfig_1.default.networks[chainId].moduleFactoryAddress,
        cooldown: globalConfig_1.default.networks[chainId].recoveryCooldown,
        expiration: globalConfig_1.default.networks[chainId].recoveryExpiration
    };
    const delayAddress = await delayModuleService.getDelayAddress(chainId, walletAddress, context);
    logger_1.default.info('delay address: ', { delayAddress });
    const isDelayModuleDeployed = await delayModuleService.isDeployed({
        delayAddress,
        chainId
    });
    if (!isDelayModuleDeployed)
        throw (0, http_errors_1.BadRequest)(`Recovery not set up`);
    const canRecover = await delayModuleService.isQueueEmpty(chainId, delayAddress);
    logger_1.default.info('canRecover: ', { canRecover });
    const guardianAddress = await delayModuleService.getGuardianAddress({
        delayAddress,
        chainId
    });
    if (!canRecover)
        throw (0, http_errors_1.BadRequest)(`This walletAddress already has an ongoing recovery request. Cancel or finalize this recovery request before starting a new one`);
    const safeTxData = await delayModuleService.createRecoveryMultiTx(chainId, walletAddress, newOwners, newThreshold || 1, context);
    logger_1.default.info('wallet guardian: ', { guardianAddress });
    if (!guardianAddress || !(0, utils_1.isAddress)(guardianAddress))
        throw new http_errors_1.BadRequest('Guardian address not valid');
    logger_1.default.info('safe tx data constructed', { safeTxData });
    const threshold = await safeService_1.default.getThreshold(guardianAddress, chainId);
    logger_1.default.info('threshold', { threshold });
    if (threshold > 1) {
        await safeService_1.default.proposeTransaction(guardianAddress, safeTxData, chainId);
        logger_1.default.info('Recovery tx proposed: need a manual check to validate');
        return;
    }
    safeTxData.nonce = ethers_1.BigNumber.from(await safeService_1.default.getNonce(guardianAddress, chainId)).toString();
    logger_1.default.info('get nonce', { nonce: safeTxData.nonce });
    const signatures = await googleCloudKmsService_1.default.signTypedData({
        chainId,
        verifyingContract: guardianAddress
    }, EIP712_SAFE_TX_TYPES, safeTxData);
    logger_1.default.info('signature', signatures);
    const transactionData = {
        ...safeTxData,
        signatures
    };
    logger_1.default.info('guardian address', { guardianAddress, chainId });
    const safeRecoveryTx = await safeService_1.default.execEncodeFunctionData(transactionData);
    await relayService_1.default.relaySendTransaction(safeRecoveryTx, guardianAddress, chainId, walletAddress, projectId, true);
    logger_1.default.info('Recovery tx automatically proposed');
};
const startRecoveryRequest = async (projectId, chainId, walletAddress, newOwner, passkey, newThreshold = 1) => {
    await startRecovery(projectId, chainId, walletAddress, [newOwner], newThreshold);
    logger_1.default.info('passkey:', passkey);
    if (passkey) {
        const webAuthnDeploymentParams = webAuthnSignerService_1.default.currentWebAuthnDeploymentParams(chainId);
        await webAuthnSignerRepository_1.default.createWebAuthnSigner({
            projectId,
            chainId,
            smartAccountAddress: walletAddress,
            publicKeyId: passkey.publicKeyId,
            publicKeyX: passkey.publicKeyX,
            publicKeyY: passkey.publicKeyY,
            signerAddress: newOwner,
            deviceData: passkey.deviceData,
            webAuthnDeploymentParams,
            isSharedWebAuthnSigner: false
        });
    }
};
const finalizeRecovery = async (projectId, chainId, walletAddress) => {
    const wallet = await walletRepository_1.default.getWalletByChain(projectId, chainId.toString(), walletAddress);
    if (!wallet)
        throw new http_errors_1.NotFound('wallet not found for this project');
    await _validateWalletState(projectId, chainId, wallet);
    const recoveryModuleAddress = await delayModuleService.getDelayAddress(chainId, walletAddress);
    logger_1.default.info('recoveryModuleAddress: ', { recoveryModuleAddress });
    const recoveryRequest = await delayModuleService.getNextTxToExecute(Number(wallet.chainId), recoveryModuleAddress);
    logger_1.default.info('recoveryRequest: ', { recoveryRequest });
    if (!recoveryRequest)
        throw new http_errors_1.BadRequest('No recovery request for this wallet was found onchain');
    if (Math.floor(Date.now() / 1000) < recoveryRequest.executionTime)
        throw (0, http_errors_1.BadRequest)('Recovery period not complete');
    const transactionData = await delayModuleService.createExecuteTx(recoveryRequest.to, recoveryRequest.value, recoveryRequest.data, recoveryRequest.operation);
    const signerAddress = delayModuleService.getNewOwnersFromCalldata(recoveryRequest)[0];
    await relayService_1.default.relaySendTransaction(transactionData, recoveryModuleAddress, Number(wallet.chainId), wallet.address, wallet.projectId);
    logger_1.default.info('Finalize recovery sent onchain for:', { signerAddress });
    return signerAddress;
};
const finalizeRecoveryRequest = async (projectId, chainId, walletAddress) => {
    const signerAddress = await finalizeRecovery(projectId, chainId, walletAddress);
    const webAuthnSigner = await webAuthnSignerRepository_1.default.getProjectWebAuthnSignerBySignerAddressAndChain(projectId, signerAddress, chainId);
    logger_1.default.info('WebAuthnSigner:', { webAuthnSigner });
    if (webAuthnSigner !== null)
        await relayService_1.default.relaySendTransaction(webAuthnSignerService_1.default.encodeP256DeployFunction(webAuthnSigner.publicKeyX, webAuthnSigner.publicKeyY, webAuthnSigner.deploymentParams.verifier), webAuthnSigner.deploymentParams.safeWebAuthnSignerFactory, chainId, walletAddress, projectId);
    logger_1.default.info('WebAuthnSigner deployed');
};
exports.default = {
    startRecovery,
    startRecoveryRequest,
    finalizeRecovery,
    finalizeRecoveryRequest
};
//# sourceMappingURL=socialRecoveryService.js.map