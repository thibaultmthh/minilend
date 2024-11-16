"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const webAuthnSignerFactory_json_1 = __importDefault(require("../contracts/abi/webAuthnSignerFactory.json"));
const relayService_1 = __importDefault(require("../services/relayService/relayService"));
const webAuthnSignerRepository_1 = __importDefault(require("./webAuthnSignerRepository"));
const webAuthnSignerTypes_1 = require("./webAuthnSignerTypes");
const currentWebAuthnDeploymentParams = (chainId) => {
    return {
        version: webAuthnSignerTypes_1.WebauthnVersion.V1,
        safeWebAuthnSharedSignerAddress: globalConfig_1.default.networks[chainId].safeWebAuthnSharedSignerAddress,
        safeWebAuthnSignerFactory: globalConfig_1.default.networks[chainId].safeWebAuthnSignerFactory,
        safeWebAuthnSignerSingleton: globalConfig_1.default.networks[chainId].safeWebAuthnSignerSingleton,
        verifier: globalConfig_1.default.networks[chainId].safeP256VerifierAddress
    };
};
const createWebAuthnSigner = async ({ projectId, chainId, walletAddress, publicKeyId, publicKeyX, publicKeyY, deviceData, isSharedWebAuthnSigner, signerAddress, webAuthnDeploymentParams }) => {
    await webAuthnSignerRepository_1.default.createWebAuthnSigner({
        projectId,
        chainId,
        smartAccountAddress: walletAddress,
        publicKeyId,
        publicKeyX,
        publicKeyY,
        signerAddress,
        deviceData,
        webAuthnDeploymentParams,
        isSharedWebAuthnSigner
    });
    return signerAddress;
};
const getProjectWebAuthnSignersByWalletAddress = async (projectId, walletAddress) => {
    if (!walletAddress)
        throw new Error('No wallet found for user');
    const webAuthnSigners = await webAuthnSignerRepository_1.default.getProjectWebAuthnSignersByWalletAddress(projectId, walletAddress);
    return webAuthnSigners;
};
const getProjectWebAuthnSignersByWalletAddressAndChainId = async (projectId, walletAddress, chainId) => {
    if (!walletAddress)
        throw new Error('No wallet found for user');
    return await webAuthnSignerRepository_1.default.getProjectWebAuthnSignersByWalletAddressAndChain(projectId, chainId, walletAddress);
};
const getProjectWebAuthnSignerByPublicKeyId = async (projectId, publicKeyId) => {
    const webAuthnSigners = [];
    for (const [chainId] of Object.entries(globalConfig_1.default.networks)) {
        const webAuthnSigner = await webAuthnSignerRepository_1.default.getProjectWebAuthnSignerByPublicKeyId(projectId, publicKeyId, +chainId);
        if (webAuthnSigner)
            webAuthnSigners.push(webAuthnSigner);
    }
    return webAuthnSigners;
};
const predictSignerAddress = async (publicKeyX, publicKeyY, chainId) => {
    const deploymentCode = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.solidityPack(['bytes', 'uint256', 'uint256', 'uint256', 'uint256'], [
        globalConfig_1.default.safeWebAuthnSignerProxyCreationCode,
        globalConfig_1.default.networks[chainId].safeWebAuthnSignerSingleton,
        publicKeyX,
        publicKeyY,
        globalConfig_1.default.networks[chainId].safeP256VerifierAddress
    ]));
    const salt = ethers_1.ethers.constants.HashZero;
    return ethers_1.ethers.utils.getCreate2Address(globalConfig_1.default.networks[chainId].safeWebAuthnSignerFactory, salt, deploymentCode);
};
const encodeP256DeployFunction = (x, y, verifier) => {
    const functionInterface = new ethers_1.ethers.utils.Interface(webAuthnSignerFactory_json_1.default);
    return functionInterface.encodeFunctionData('createSigner', [x, y, verifier]);
};
const deployWebAuthnSigner = async (projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData, webAuthnDeploymentParams) => {
    await webAuthnSignerRepository_1.default.createWebAuthnSigner({
        projectId,
        chainId,
        smartAccountAddress: walletAddress,
        publicKeyId,
        publicKeyX,
        publicKeyY,
        signerAddress,
        deviceData,
        webAuthnDeploymentParams,
        isSharedWebAuthnSigner: false
    });
    await relayService_1.default.relaySendTransaction(encodeP256DeployFunction(publicKeyX, publicKeyY, webAuthnDeploymentParams.verifier), webAuthnDeploymentParams.safeWebAuthnSignerFactory, chainId, walletAddress, projectId);
    return signerAddress;
};
exports.default = {
    currentWebAuthnDeploymentParams,
    createWebAuthnSigner,
    getProjectWebAuthnSignersByWalletAddress,
    getProjectWebAuthnSignerByPublicKeyId,
    predictSignerAddress,
    encodeP256DeployFunction,
    deployWebAuthnSigner,
    getProjectWebAuthnSignersByWalletAddressAndChainId
};
//# sourceMappingURL=webAuthnSignerService.js.map