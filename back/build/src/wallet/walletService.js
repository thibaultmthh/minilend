"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = require("elliptic");
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const logger_1 = __importDefault(require("../services/logger"));
const safeService_1 = __importDefault(require("../services/safeService"));
const utils_1 = require("../utils/utils");
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const enableModule_json_1 = __importDefault(require("../contracts/abi/enableModule.json"));
const safe_json_1 = __importDefault(require("../contracts/abi/safe.json"));
const walletRepository_1 = __importDefault(require("./walletRepository"));
const walletTypes_1 = require("./walletTypes");
const P256 = new elliptic_1.ec('p256');
const { EIP712_SAFE_MESSAGE_TYPE } = safeService_1.default;
const currentWalletDeploymentParams = async (chainId) => {
    return {
        version: walletTypes_1.WalletVersion.V1,
        safeContractParams: {
            safeProxyFactoryAddress: globalConfig_1.default.networks[chainId].safeProxyFactoryAddress,
            safeSingletonAddress: globalConfig_1.default.networks[chainId].safeSingletonAddress,
            fallbackHandler: globalConfig_1.default.networks[chainId].safe4337ModuleAddress,
            multisendAddress: globalConfig_1.default.networks[chainId].multisendAddress,
            setUpContractAddress: globalConfig_1.default.networks[chainId].safeModuleSetUpAddress,
            safeWebAuthnSharedSignerContractAddress: globalConfig_1.default.networks[chainId].safeWebAuthnSharedSignerAddress,
            p256Verifier: globalConfig_1.default.networks[chainId].safeP256VerifierAddress,
            safe4337SessionKeysModule: globalConfig_1.default.networks[chainId]
                .safe4337SessionKeysModule
        },
        recoveryParams: {
            moduleFactoryAddress: globalConfig_1.default.networks[chainId].moduleFactoryAddress,
            delayModuleAddress: globalConfig_1.default.networks[chainId].delayModuleAddress,
            recoveryCooldown: globalConfig_1.default.networks[chainId].recoveryCooldown,
            recoveryExpiration: globalConfig_1.default.networks[chainId].recoveryExpiration
        }
    };
};
const isValidSignature = async (projectId, walletAddress, message, signature, chainId) => {
    if (await safeService_1.default.isDeployed(walletAddress, chainId)) {
        return safeService_1.default.isValidSignature(walletAddress, message, signature, chainId);
    }
    const wallet = await getWallet(projectId, chainId.toString(), walletAddress);
    if (!wallet)
        throw Error('Wallet does no exists in db');
    const { fallbackHandler, setUpContractAddress, safeSingletonAddress, safeProxyFactoryAddress } = wallet?.deploymentParams.safeContractParams;
    // for now, we assume that if signature is 65 bytes long, it has to be an
    // EOA signature.
    const signatureLength = ethers_1.ethers.utils.hexDataLength(signature);
    if (signatureLength == 65) {
        const ownerAddress = ethers_1.ethers.utils.verifyTypedData({
            verifyingContract: walletAddress,
            chainId
        }, EIP712_SAFE_MESSAGE_TYPE, { message: ethers_1.ethers.utils.toUtf8Bytes(message) }, signature);
        const enableModuleInterface = new ethers_1.ethers.utils.Interface(enableModule_json_1.default);
        const safeInterface = new ethers_1.ethers.utils.Interface(safe_json_1.default);
        const encodeEnableModulesData = enableModuleInterface.encodeFunctionData('enableModules', [[fallbackHandler]]);
        const setUpData = safeInterface.encodeFunctionData('setup', [
            [ownerAddress],
            1,
            setUpContractAddress,
            encodeEnableModulesData,
            fallbackHandler,
            ethers_1.ethers.constants.AddressZero,
            0,
            ethers_1.ethers.constants.AddressZero
        ]);
        const predictedSafeAddress = await safeService_1.default.predictSafeAddress(setUpData, 0, chainId, safeProxyFactoryAddress, safeSingletonAddress);
        return walletAddress === predictedSafeAddress;
    }
    // https://docs.safe.global/smart-account-signatures#contract-signature-eip-1271
    // {bytes32 r}{bytes32 s}{uint8 v}{uint256 dataLen}{bytes data}
    // r: P256Signer address
    // v: 0
    // s: data offset (should be 65)
    // data:
    //    struct SignatureLayout {
    //        bytes authenticatorData;
    //        bytes clientData;
    //        uint256 challengeOffset;
    //        uint256[2] rs;
    //    }
    if (signatureLength < 65)
        return false;
    const challenge = ethers_1.ethers.utils._TypedDataEncoder.hash({
        verifyingContract: walletAddress,
        chainId
    }, EIP712_SAFE_MESSAGE_TYPE, { message: ethers_1.ethers.utils.toUtf8Bytes(message) });
    const r = ethers_1.ethers.utils.hexDataSlice(signature, 0, 32);
    const s = ethers_1.ethers.utils.hexDataSlice(signature, 32, 64);
    const v = ethers_1.ethers.utils.hexDataSlice(signature, 64, 65);
    if (ethers_1.ethers.BigNumber.from(v).toNumber() !== 0)
        return false;
    if (ethers_1.ethers.BigNumber.from(s).toNumber() !== 65)
        return false;
    const p256SignerAddress = ethers_1.ethers.utils.defaultAbiCoder.decode(['address'], r)[0];
    const signatureData = ethers_1.ethers.utils.hexDataSlice(signature, 65 + 32);
    const p256Signature = ethers_1.ethers.utils.defaultAbiCoder.decode([
        'bytes authenticatorData',
        'string clientDataFields',
        'uint256[2] signature'
    ], signatureData);
    const encodedChallenge = (0, utils_1.base64ToBase64Url)(ethers_1.ethers.utils.base64.encode(challenge));
    // comes from https://github.com/safe-global/safe-modules/blob/14a2a1ef7c9b4f872668213d7c7fc4345563e1fd/modules/passkey/contracts/libraries/WebAuthn.sol#L140
    const ClientDataJson = `{"type":"webauthn.get","challenge":"${encodedChallenge}",${p256Signature.clientDataFields}}`;
    const clientDataHash = ethers_1.ethers.utils.sha256(ethers_1.ethers.utils.toUtf8Bytes(ClientDataJson));
    const webauthnSigners = await webAuthnSignerService_1.default.getProjectWebAuthnSignersByWalletAddressAndChainId(projectId, walletAddress, chainId);
    // safe was not deployed. It has to have only one signer
    if (!webauthnSigners) {
        return false;
    }
    if (webauthnSigners.length !== 1) {
        logger_1.default.warn(`Undeployed safe is supposed to have only 1 signer but have ${webauthnSigners.length}`);
        return false;
    }
    const expectedSigner = webauthnSigners[0];
    if (p256SignerAddress.toLowerCase() !==
        expectedSigner.signerAddress.toLowerCase()) {
        return false;
    }
    const key = P256.keyFromPublic({
        x: expectedSigner.publicKeyX.slice(2),
        y: expectedSigner.publicKeyY.slice(2)
    }, 'hex');
    const sig = {
        r: p256Signature.signature[0].toHexString().slice(2),
        s: p256Signature.signature[1].toHexString().slice(2)
    };
    const webauthnHash = ethers_1.ethers.utils.sha256(ethers_1.ethers.utils.concat([
        ethers_1.ethers.utils.hexlify(p256Signature.authenticatorData),
        clientDataHash
    ]));
    return key.verify(webauthnHash.slice(2), sig);
};
const createOrUpdateWalletInDB = async (projectId, chainId, address, initiatorAddress, deploymentParams) => {
    return await walletRepository_1.default.createOrUpdateWallet(projectId, chainId, address, new Date(), initiatorAddress, deploymentParams);
};
const getWallet = async (projectId, chainId, address) => {
    return await walletRepository_1.default.getWalletByChain(projectId, chainId, address);
};
const getWalletForAllChains = async (projectId, address) => {
    const wallets = await walletRepository_1.default.getWalletForAllChains(projectId, address);
    return wallets;
};
const importExternalSafe = async (projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData) => {
    const isSignerOwner = await safeService_1.default.isSafeOwner(walletAddress, signerAddress, chainId);
    if (!isSignerOwner) {
        logger_1.default.info('Signer is not an owner of the wallet');
        throw new Error('Signer is not an owner of the wallet');
    }
    if (publicKeyId) {
        const currentWebAuthnDeploymentParams = webAuthnSignerService_1.default.currentWebAuthnDeploymentParams(chainId);
        await webAuthnSignerService_1.default.createWebAuthnSigner({
            projectId,
            chainId,
            walletAddress,
            signerAddress,
            publicKeyId,
            publicKeyX,
            publicKeyY,
            deviceData,
            webAuthnDeploymentParams: currentWebAuthnDeploymentParams,
            isSharedWebAuthnSigner: true
        });
    }
    await createOrUpdateWalletInDB(projectId, chainId.toString(), walletAddress, signerAddress, await currentWalletDeploymentParams(+chainId));
};
const getWalletsByProjectId = async (projectId, limit, offset) => {
    const wallets = await walletRepository_1.default.getWalletsByProjectId(projectId, limit, offset);
    return wallets;
};
exports.default = {
    currentWalletDeploymentParams,
    isValidSignature,
    createOrUpdateWalletInDB,
    getWallet,
    importExternalSafe,
    getWalletForAllChains,
    getWalletsByProjectId
};
//# sourceMappingURL=walletService.js.map