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
const multicallService_1 = __importDefault(require("../services/multicallService"));
const RECOVERY_MODULE = '0x0C3a517aCE13BBCA055F8FFc5f97A1CFe732C381';
const DEFAULT_GUARDIAN = 'COMETH';
jest.doMock('@/config/globalConfig', () => ({
    networks: {
        // Default network: Polygon
        137: {
            RPCUrl: process.env.RPC_URL_POLYGON || 'https://polygon-mainnet',
            guardianId: 'COMETH',
            safeProxyFactoryAddress: '0x_safeProxyAddress',
            safeSingletonAddress: '0x_safeSingletonAddress',
            safeFallbackHandler: '0x_safeFallbackHandler',
            multicallAddress: '0x_multicallAddress',
            multisendContractAddress: '0x_multisendContractAddress',
            socialRecoveryModuleAddress: '0x_socialRecoveryModuleAddress',
            deploymentManagerAddress: '0x_deploymentManagerAddress',
            P256FactoryContract: '0x_P256FactoryContract',
            P256SignerCreationCode: '0x_P256SignerCreationCode',
            guardianAddress: DEFAULT_GUARDIAN
        }
    },
    socialRecoveryModuleAddress: RECOVERY_MODULE
}));
const ethers_1 = require("ethers");
const http_errors_1 = require("http-errors");
const mockdate_1 = __importDefault(require("mockdate"));
const mongoMock_1 = require("../../tests/unit/mongoMock");
const testUtils_1 = require("../../tests/unit/testUtils");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const delayModuleService = __importStar(require("../services/delayModuleService"));
const googleCloudKmsService_1 = __importDefault(require("../services/googleCloudKmsService"));
const relayService_1 = __importDefault(require("../services/relayService/relayService"));
const safeService_1 = __importDefault(require("../services/safeService"));
const walletRepository_1 = __importDefault(require("../wallet/walletRepository"));
const webAuthnSignerRepository_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerRepository"));
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const { EIP712_SAFE_TX_TYPES } = safeService_1.default;
const socialRecoveryService_1 = __importDefault(require("./socialRecoveryService"));
const CHAIN_ID = 137;
const projectId = mongoMock_1.testIds[0];
const mockedWalletInfos = {
    projectId,
    chainId: CHAIN_ID,
    deploymentParams: testUtils_1.walletDeploymentParams
};
const mockedWebAuthnParams = {
    projectId,
    publicKeyX: '0x_publickeyX',
    publicKeyY: '0x_publickeyY',
    deploymentParams: testUtils_1.webAuthnDeploymentParams,
    verifier: '0x_verifier'
};
jest.mock('../services/relayService/relayService', () => ({
    relaySendTransaction: jest.fn()
}));
jest.mock('../services/googleCloudKmsService', () => ({
    signTypedData: jest.fn(),
    isGcpKmsSetup: jest.fn()
}));
jest.mock('../services/safeService', () => ({
    getNonce: jest.fn(),
    execEncodeFunctionData: jest.fn(),
    getThreshold: jest.fn(),
    proposeTransaction: jest.fn(),
    isModuleEnabled: jest.fn(),
    isDeployed: jest.fn()
}));
jest.mock('@/wallet/walletRepository', () => ({
    getWalletByChain: jest.fn()
}));
jest.mock('@/webAuthnSigner/webAuthnSignerService', () => ({
    currentWebAuthnDeploymentParams: jest.fn(),
    deployWebAuthnSigner: jest.fn(),
    encodeP256DeployFunction: jest.fn()
}));
jest.mock('@/webAuthnSigner/webAuthnSignerRepository', () => ({
    createWebAuthnSigner: jest.fn(),
    getProjectWebAuthnSignerBySignerAddressAndChain: jest.fn()
}));
jest.mock('@/services/multicallService', () => ({
    generateMulticallTransactionData: jest.fn()
}));
jest.mock('@/services/delayModuleService', () => ({
    getDelayAddress: jest.fn(),
    getNextTxToExecute: jest.fn(),
    createExecuteTx: jest.fn(),
    isQueueEmpty: jest.fn(),
    createRecoveryMultiTx: jest.fn(),
    createRecoveryMultiTxForNotDeployedSafe: jest.fn(),
    computeRecoveryMultiTx: jest.fn(),
    getNewOwnersFromCalldata: jest.fn(),
    isDeployed: jest.fn(),
    getGuardianAddress: jest.fn()
}));
describe('socialRecoveryService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const guardianAddress = '0xbEdD8215C76A6F93F2f87BD1feD5132D81e7b892';
    const mockedNonce = '0';
    const mockedSafeTxHash = 'Ox_mockedSafeTxHash';
    const mockedSafeExecEncodedFunctionData = '0x_mockedSafeExecEncodedFunctionData';
    const mockedSafeDeployAndExecEncodedFunctionData = '0x_mockedSafeDeployAndExecEncodedFunctionData';
    const mockedTxHash = 'Ox_mockedTxHash';
    const _setStartRecoveryMock = () => {
        (0, testUtils_1.getFunctionMock)(googleCloudKmsService_1.default.isGcpKmsSetup).mockResolvedValue(true);
        (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue(mockedWalletInfos);
        (0, testUtils_1.getFunctionMock)(relayService_1.default.relaySendTransaction).mockResolvedValue(mockedSafeTxHash);
        (0, testUtils_1.getFunctionMock)(safeService_1.default.execEncodeFunctionData).mockResolvedValue(mockedSafeExecEncodedFunctionData);
        (0, testUtils_1.getFunctionMock)(safeService_1.default.getNonce).mockReturnValue(mockedNonce);
        (0, testUtils_1.getFunctionMock)(safeService_1.default.isDeployed).mockReturnValue(true);
        (0, testUtils_1.getFunctionMock)(multicallService_1.default.generateMulticallTransactionData).mockResolvedValue(mockedSafeDeployAndExecEncodedFunctionData);
        (0, testUtils_1.getFunctionMock)(safeService_1.default.getThreshold).mockResolvedValue(1);
        (0, testUtils_1.getFunctionMock)(delayModuleService.getGuardianAddress).mockResolvedValue(guardianAddress);
        (0, testUtils_1.getFunctionMock)(delayModuleService.isDeployed).mockResolvedValue(true);
        (0, testUtils_1.getFunctionMock)(delayModuleService.isQueueEmpty).mockResolvedValue({});
        (0, testUtils_1.getFunctionMock)(safeService_1.default.proposeTransaction).mockResolvedValue({});
        (0, testUtils_1.getFunctionMock)(delayModuleService.createRecoveryMultiTx).mockResolvedValue({
            to: globalConfig_1.default.networks[CHAIN_ID].delayModuleAddress,
            value: 0,
            data: '0x_data',
            operation: 0,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: ethers_1.ethers.constants.AddressZero,
            refundReceiver: ethers_1.ethers.constants.AddressZero
        });
        (0, testUtils_1.getFunctionMock)(delayModuleService.createRecoveryMultiTxForNotDeployedSafe).mockResolvedValue({
            to: globalConfig_1.default.networks[CHAIN_ID].delayModuleAddress,
            value: 0,
            data: '0x_data',
            operation: 0,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: ethers_1.ethers.constants.AddressZero,
            refundReceiver: ethers_1.ethers.constants.AddressZero,
            nonce: ethers_1.BigNumber.from(mockedNonce).toString()
        });
    };
    const _setFinalizeRecoveryMock = () => {
        (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue(mockedWalletInfos);
        (0, testUtils_1.getFunctionMock)(relayService_1.default.relaySendTransaction).mockResolvedValue(mockedTxHash);
        (0, testUtils_1.getFunctionMock)(safeService_1.default.isDeployed).mockReturnValue(true);
        (0, testUtils_1.getFunctionMock)(webAuthnSignerRepository_1.default.getProjectWebAuthnSignerBySignerAddressAndChain).mockResolvedValue(mockedWebAuthnParams);
        (0, testUtils_1.getFunctionMock)(delayModuleService.getNextTxToExecute).mockResolvedValue('0x_encodedp256data');
        (0, testUtils_1.getFunctionMock)(delayModuleService.getNewOwnersFromCalldata).mockReturnValue(['0x_newOwner1']);
        (0, testUtils_1.getFunctionMock)(delayModuleService.createRecoveryMultiTx).mockReturnValue({});
    };
    describe('startRecoveryRequest', () => {
        const walletAddress = '0xBd6C2fB144bc72EE91db8EFc5d16465362714F0B';
        const chainId = CHAIN_ID;
        const publicKeyId = 'publicKey';
        const publicKeyX = '0x_x';
        const publicKeyY = '0x_y';
        const newOwners = ['0x_signer'];
        const deviceData = { browser: 'Chrome', os: 'macOS', platform: 'mobile' };
        const newThreshold = 1;
        const passkey = {
            deviceData,
            publicKeyId,
            publicKeyX,
            publicKeyY
        };
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.currentWebAuthnDeploymentParams).mockReturnValue(mockedWebAuthnParams),
                (0, testUtils_1.getFunctionMock)(webAuthnSignerRepository_1.default.createWebAuthnSigner).mockReturnValue({});
            _setStartRecoveryMock();
        });
        it(`Given startRecoveryRequest params, when creating a valid social recovery request, then send the right params to repo`, async () => {
            await socialRecoveryService_1.default.startRecoveryRequest(projectId, chainId, walletAddress, newOwners[0], passkey, newThreshold);
            expect(webAuthnSignerService_1.default.currentWebAuthnDeploymentParams).toHaveBeenCalledWith(chainId);
            expect(webAuthnSignerRepository_1.default.createWebAuthnSigner).toHaveBeenCalledWith({
                projectId,
                chainId,
                smartAccountAddress: walletAddress,
                publicKeyId,
                publicKeyX,
                publicKeyY,
                signerAddress: newOwners[0],
                deviceData,
                webAuthnDeploymentParams: mockedWebAuthnParams,
                isSharedWebAuthnSigner: false
            });
        });
    });
    describe('startRecovery', () => {
        const walletAddress = '0xBd6C2fB144bc72EE91db8EFc5d16465362714F0B';
        const newOwners = ['0xBd6C2fB144bc72EE91db8EFc5d16465362714F0B'];
        const newThreshold = 1;
        beforeEach(() => {
            _setStartRecoveryMock();
        });
        it(`Given the right parameters, when starting a recovery with one signer, then send the right parameters to services`, async () => {
            await socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold);
            expect(walletRepository_1.default.getWalletByChain).toHaveBeenCalledWith(projectId, CHAIN_ID.toString(), walletAddress);
            expect(safeService_1.default.getThreshold).toHaveBeenCalledWith(guardianAddress, CHAIN_ID);
            expect(safeService_1.default.getNonce).toHaveBeenCalledWith(guardianAddress, CHAIN_ID);
            expect(googleCloudKmsService_1.default.signTypedData).toHaveBeenCalledWith({
                chainId: CHAIN_ID,
                verifyingContract: guardianAddress
            }, EIP712_SAFE_TX_TYPES, {
                to: globalConfig_1.default.networks[CHAIN_ID].delayModuleAddress,
                value: 0,
                data: '0x_data',
                operation: 0,
                safeTxGas: 0,
                baseGas: 0,
                gasPrice: 0,
                gasToken: ethers_1.ethers.constants.AddressZero,
                refundReceiver: ethers_1.ethers.constants.AddressZero,
                nonce: ethers_1.BigNumber.from(mockedNonce).toString()
            });
            expect(relayService_1.default.relaySendTransaction).toHaveBeenCalledWith(mockedSafeExecEncodedFunctionData, guardianAddress, CHAIN_ID, walletAddress, projectId, true);
        });
        it(`Given the right parameters, when starting a recovery with two signers, then return the safeTxHash`, async () => {
            (0, testUtils_1.getFunctionMock)(safeService_1.default.getThreshold).mockResolvedValue(2);
            const result = await socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold);
            expect(result).toEqual(undefined);
        });
        it(`Given the right parameters, when starting a recovery with two signers, then send the right parameters to services`, async () => {
            (0, testUtils_1.getFunctionMock)(safeService_1.default.getThreshold).mockResolvedValue(2);
            await socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold);
            expect(safeService_1.default.getThreshold).toHaveBeenCalledWith(guardianAddress, CHAIN_ID);
            expect(safeService_1.default.proposeTransaction).toHaveBeenCalledWith(guardianAddress, {
                to: globalConfig_1.default.networks[CHAIN_ID].delayModuleAddress,
                value: 0,
                data: '0x_data',
                operation: 0,
                safeTxGas: 0,
                baseGas: 0,
                gasPrice: 0,
                gasToken: ethers_1.ethers.constants.AddressZero,
                refundReceiver: ethers_1.ethers.constants.AddressZero
            }, CHAIN_ID);
        });
        it(`Given the right parameters, when the walletAddress does not belong to this projectId, then throw an error`, async () => {
            (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue({
                projectId: mongoMock_1.testIds[5]
            });
            await expect(socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold)).rejects.toThrow((0, http_errors_1.BadRequest)(`This walletAddress does not belong to this projectId`));
        });
        it(`Given the right parameters, when the walletAddress is  deployed, then call recovery`, async () => {
            await socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold);
            expect(walletRepository_1.default.getWalletByChain).toHaveBeenCalledWith(projectId, CHAIN_ID.toString(), walletAddress);
            expect(safeService_1.default.getThreshold).toHaveBeenCalledWith(guardianAddress, CHAIN_ID);
            expect(safeService_1.default.getNonce).toHaveBeenCalledWith(guardianAddress, CHAIN_ID);
            expect(googleCloudKmsService_1.default.signTypedData).toHaveBeenCalledWith({
                chainId: CHAIN_ID,
                verifyingContract: guardianAddress
            }, EIP712_SAFE_TX_TYPES, {
                to: globalConfig_1.default.networks[CHAIN_ID].delayModuleAddress,
                value: 0,
                data: '0x_data',
                operation: 0,
                safeTxGas: 0,
                baseGas: 0,
                gasPrice: 0,
                gasToken: ethers_1.ethers.constants.AddressZero,
                refundReceiver: ethers_1.ethers.constants.AddressZero,
                nonce: ethers_1.BigNumber.from(mockedNonce).toString()
            });
            expect(relayService_1.default.relaySendTransaction).toHaveBeenCalledWith(mockedSafeExecEncodedFunctionData, '0xbEdD8215C76A6F93F2f87BD1feD5132D81e7b892', CHAIN_ID, walletAddress, projectId, true);
        });
        describe('SafeRecovery', () => {
            const recoveryRequest = {
                data: '0x_data',
                executionTime: 0
            };
            const delayAddress = '0x_delay_address';
            const context = {
                moduleAddress: testUtils_1.walletDeploymentParams.recoveryParams.delayModuleAddress,
                moduleFactoryAddress: testUtils_1.walletDeploymentParams.recoveryParams.moduleFactoryAddress,
                cooldown: testUtils_1.walletDeploymentParams.recoveryParams.recoveryCooldown,
                expiration: testUtils_1.walletDeploymentParams.recoveryParams.recoveryExpiration
            };
            beforeEach(() => {
                (0, testUtils_1.getFunctionMock)(delayModuleService.getDelayAddress).mockResolvedValue(delayAddress);
                (0, testUtils_1.getFunctionMock)(delayModuleService.createRecoveryMultiTx).mockResolvedValue({});
                (0, testUtils_1.getFunctionMock)(delayModuleService.createRecoveryMultiTxForNotDeployedSafe).mockResolvedValue({});
                (0, testUtils_1.getFunctionMock)(delayModuleService.isQueueEmpty).mockResolvedValue({});
                (0, testUtils_1.getFunctionMock)(delayModuleService.getNewOwnersFromCalldata).mockResolvedValue(recoveryRequest);
            });
            it(`Given the right parameters, when starting a recovery, then send right parameters to service`, async () => {
                await socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold);
                expect(delayModuleService.getDelayAddress).toHaveBeenCalledWith(CHAIN_ID, walletAddress, context);
                expect(delayModuleService.isQueueEmpty).toHaveBeenCalledWith(CHAIN_ID, delayAddress);
                expect(delayModuleService.createRecoveryMultiTx).toHaveBeenCalledWith(CHAIN_ID, walletAddress, newOwners, newThreshold || 1, context);
            });
            it(`Given the right parameters, when the walletAddress already has an ongoing recovery request, then throw an error`, async () => {
                (0, testUtils_1.getFunctionMock)(delayModuleService.isQueueEmpty).mockResolvedValue(undefined);
                await expect(socialRecoveryService_1.default.startRecovery(projectId, CHAIN_ID, walletAddress, newOwners, newThreshold)).rejects.toThrow((0, http_errors_1.BadRequest)('This walletAddress already has an ongoing recovery request. Cancel or finalize this recovery request before starting a new one'));
            });
        });
    });
    describe('finalizeRecoveryRequest', () => {
        const walletAddress = '0xBd6C2fB144bc72EE91db8EFc5d16465362714F0B';
        const newOwner = '0x_newOwner1';
        const chainId = CHAIN_ID;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.deployWebAuthnSigner).mockResolvedValue(true);
            _setFinalizeRecoveryMock();
        });
        it(`Given a finalizeRecoveryRequest params, when finalizing a social recovery request, then send the right params to services`, async () => {
            await socialRecoveryService_1.default.finalizeRecoveryRequest(projectId, chainId, walletAddress);
            expect(webAuthnSignerService_1.default.encodeP256DeployFunction).toHaveBeenCalledWith(mockedWebAuthnParams.publicKeyX, mockedWebAuthnParams.publicKeyY, '');
        });
        it(`Given a finalizeRecoveryRequest params, when finalizing a social recovery request, then send the right params to repositories and services`, async () => {
            await socialRecoveryService_1.default.finalizeRecoveryRequest(projectId, chainId, walletAddress);
            expect(webAuthnSignerRepository_1.default.getProjectWebAuthnSignerBySignerAddressAndChain).toHaveBeenCalledWith(projectId, newOwner, chainId);
        });
    });
    describe('finalizeRecovery', () => {
        const walletAddress = '0xBd6C2fB144bc72EE91db8EFc5d16465362714F0B';
        const newOwner = '0x_newOwner1';
        beforeEach(() => {
            _setFinalizeRecoveryMock();
        });
        it(`Given a wallet address and chain id, when finalizing a recovery, then return the safeTxHash`, async () => {
            const newAddedOwner = await socialRecoveryService_1.default.finalizeRecovery(projectId, CHAIN_ID, walletAddress);
            expect(newAddedOwner).toEqual(newOwner);
        });
        describe('SafeRecovery', () => {
            const delayAddress = '0x_delay_address';
            const recoveryRequest = {
                to: delayAddress,
                value: 0,
                data: '0x_data',
                operation: 0,
                executionTime: 0
            };
            beforeEach(() => {
                (0, testUtils_1.getFunctionMock)(delayModuleService.getDelayAddress).mockResolvedValue(delayAddress);
                (0, testUtils_1.getFunctionMock)(delayModuleService.getNextTxToExecute).mockResolvedValue(recoveryRequest);
                (0, testUtils_1.getFunctionMock)(delayModuleService.createExecuteTx).mockResolvedValue('0x_tx_data');
                (0, testUtils_1.getFunctionMock)(delayModuleService.getNewOwnersFromCalldata).mockResolvedValue(newOwner);
            });
            it(`Given a wallet address and chain id, when finalizing a recovery, then send the right parameters to social recovery module service`, async () => {
                await socialRecoveryService_1.default.finalizeRecovery(projectId, CHAIN_ID, walletAddress);
                expect(delayModuleService.getDelayAddress).toHaveBeenCalledWith(CHAIN_ID, walletAddress);
                expect(delayModuleService.getNextTxToExecute).toHaveBeenCalledWith(CHAIN_ID, delayAddress);
                expect(delayModuleService.createExecuteTx).toHaveBeenCalledWith(recoveryRequest.to, recoveryRequest.value, recoveryRequest.data, recoveryRequest.operation);
                expect(delayModuleService.getNewOwnersFromCalldata).toHaveBeenCalledWith(recoveryRequest);
            });
            it(`Given no pending recovery request, when finalizing a recovery, then throw an error`, async () => {
                (0, testUtils_1.getFunctionMock)(delayModuleService.getNextTxToExecute).mockResolvedValue(undefined);
                await expect(socialRecoveryService_1.default.finalizeRecovery(projectId, CHAIN_ID, walletAddress)).rejects.toThrow((0, http_errors_1.BadRequest)('No recovery request for this wallet was found onchain'));
            });
            it(`Given a pending recovery request, when Recovery period not complete, then throw an error`, async () => {
                mockdate_1.default.set(new Date('2022-09-23'));
                (0, testUtils_1.getFunctionMock)(delayModuleService.getNextTxToExecute).mockResolvedValue({
                    to: delayAddress,
                    value: 0,
                    data: '0x_data',
                    operation: 0,
                    executionTime: Math.floor(Date.now() / 100)
                });
                await expect(socialRecoveryService_1.default.finalizeRecovery(projectId, CHAIN_ID, walletAddress)).rejects.toThrow((0, http_errors_1.BadRequest)('Recovery period not complete'));
            });
        });
    });
});
//# sourceMappingURL=socialRecoveryService.spec.js.map