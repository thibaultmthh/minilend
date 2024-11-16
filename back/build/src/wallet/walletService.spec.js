"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CHAIN_ID = 137;
const mockdate_1 = __importDefault(require("mockdate"));
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const safeService_1 = __importDefault(require("../services/safeService"));
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const walletRepository_1 = __importDefault(require("./walletRepository"));
const walletService_1 = __importDefault(require("./walletService"));
jest.mock('./walletRepository', () => ({
    createOrUpdateWallet: jest.fn(),
    getWalletForAllChains: jest.fn(),
    getWalletByChain: jest.fn()
}));
jest.mock('@/services/safeService', () => ({
    isSafeOwner: jest.fn()
}));
jest.mock('@/webAuthnSigner/webAuthnSignerService', () => ({
    currentWebAuthnDeploymentParams: jest.fn(),
    createWebAuthnSigner: jest.fn()
}));
const WALLET_ADDRESS = '0x6341a55dd860BBEEcc1614a27cC1fFa452397baD';
describe('walletService', () => {
    const { setupResMocks } = expressMock_1.default.getExpressMockPack();
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-17T22:00:00.000Z'));
    });
    beforeEach(() => {
        setupResMocks();
        (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue({
            chainId: CHAIN_ID,
            address: WALLET_ADDRESS,
            initiatorAddress: '0x_initiator_address',
            deploymentParams: testUtils_1.walletDeploymentParams
        });
        (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletForAllChains).mockResolvedValue([
            {
                chainId: CHAIN_ID,
                address: WALLET_ADDRESS,
                initiatorAddress: '0x_initiator_address',
                deploymentParams: testUtils_1.walletDeploymentParams
            }
        ]);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createOrUpdateWallet', () => {
        const walletMock = {
            projectId: 'project_1',
            chainId: '0x89',
            address: '0x1234567890123456789012345678901234567890',
            initiatorAddress: '0x1234567890123456789012345678901234567890',
            creationDate: new Date('2022-09-17T22:00:00.000Z'),
            connectionDate: new Date('2022-09-17T22:00:00.000Z'),
            walletDeploymentParams: testUtils_1.walletDeploymentParams
        };
        const newDate = new Date('2022-09-17T22:00:00.000Z');
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(walletRepository_1.default.createOrUpdateWallet).mockResolvedValue({
                ...walletMock,
                connectionDate: newDate
            });
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });
        it('Given wallet params, then return the created or updated wallet instance', async () => {
            const wallet = await walletService_1.default.createOrUpdateWalletInDB(walletMock.projectId, walletMock.chainId, walletMock.address, walletMock.initiatorAddress, walletMock.walletDeploymentParams);
            expect(wallet?.connectionDate).toStrictEqual(newDate);
        });
        it('Given an address and an initiatorAddress, then send right params to repo', async () => {
            await walletService_1.default.createOrUpdateWalletInDB(walletMock.projectId, walletMock.chainId, walletMock.address, walletMock.initiatorAddress, walletMock.walletDeploymentParams);
            expect(walletRepository_1.default.createOrUpdateWallet).toHaveBeenCalledWith(walletMock.projectId, walletMock.chainId, walletMock.address, walletMock.creationDate, walletMock.initiatorAddress, walletMock.walletDeploymentParams);
        });
    });
    describe('getWallet', () => {
        const projectId = 'project_1';
        const chainId = CHAIN_ID.toString();
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue({
                chainId: CHAIN_ID,
                address: WALLET_ADDRESS,
                initiatorAddress: '0x_initiator_address',
                deploymentParams: testUtils_1.walletDeploymentParams
            });
        });
        it('Given an address and chainId, when getting the wallet address, then rsend right params to repo', async () => {
            await walletService_1.default.getWallet(projectId, chainId, WALLET_ADDRESS);
            expect(walletRepository_1.default.getWalletByChain).toHaveBeenCalledWith(projectId, chainId, WALLET_ADDRESS);
        });
        it('Given an address and chainId, when getting the wallet address, then return the right object', async () => {
            const wallet = await walletService_1.default.getWallet(projectId, chainId, WALLET_ADDRESS);
            expect(wallet).toStrictEqual({
                chainId: CHAIN_ID,
                address: WALLET_ADDRESS,
                initiatorAddress: '0x_initiator_address',
                deploymentParams: testUtils_1.walletDeploymentParams
            });
        });
        it('Given an address and chainId, when getting the wallet address with legacy recovery, then return the right object', async () => {
            (0, testUtils_1.getFunctionMock)(walletRepository_1.default.getWalletByChain).mockResolvedValue({
                chainId: CHAIN_ID,
                address: WALLET_ADDRESS,
                initiatorAddress: '0x_initiator_address',
                deploymentParams: testUtils_1.walletDeploymentParams
            });
            const walletInfos = await walletService_1.default.getWallet(projectId, chainId, WALLET_ADDRESS);
            expect(walletInfos).toStrictEqual({
                chainId: CHAIN_ID,
                address: WALLET_ADDRESS,
                initiatorAddress: '0x_initiator_address',
                deploymentParams: testUtils_1.walletDeploymentParams
            });
        });
    });
    describe('getWalletForAllChains', () => {
        const projectId = 'project_1';
        it('Given an address and chainId, when getting the wallet address, then rsend right params to repo', async () => {
            await walletService_1.default.getWalletForAllChains(projectId, WALLET_ADDRESS);
            expect(walletRepository_1.default.getWalletForAllChains).toHaveBeenCalledWith(projectId, WALLET_ADDRESS);
        });
        it('Given an address and chainId, when getting the wallet address, then return the right object', async () => {
            const wallet = await walletService_1.default.getWalletForAllChains(projectId, WALLET_ADDRESS);
            expect(wallet).toStrictEqual([
                {
                    chainId: CHAIN_ID,
                    address: WALLET_ADDRESS,
                    initiatorAddress: '0x_initiator_address',
                    deploymentParams: testUtils_1.walletDeploymentParams
                }
            ]);
        });
        it('Given an address and chainId, when getting the wallet address with legacy recovery, then return the right object', async () => {
            const walletInfos = await walletService_1.default.getWalletForAllChains(projectId, WALLET_ADDRESS);
            expect(walletInfos).toStrictEqual([
                {
                    chainId: CHAIN_ID,
                    address: WALLET_ADDRESS,
                    initiatorAddress: '0x_initiator_address',
                    deploymentParams: testUtils_1.walletDeploymentParams
                }
            ]);
        });
    });
    describe('importExternalSafe', () => {
        const projectId = 'project_1';
        const walletAddress = 'wallet_1';
        const chainId = 137;
        const publicKeyId = 'publicKey';
        const publicKeyX = '0x_x';
        const publicKeyY = '0x_y';
        const signerAddress = '0x_signer';
        const deviceData = { browser: 'Chrome', os: 'macOS', platform: 'mobile' };
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(safeService_1.default.isSafeOwner).mockResolvedValue(true);
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.currentWebAuthnDeploymentParams).mockReturnValue({});
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.createWebAuthnSigner).mockResolvedValue({});
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });
        it('Given wallet params, then send right params to safe service', async () => {
            await walletService_1.default.importExternalSafe(projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData);
            expect(safeService_1.default.isSafeOwner).toHaveBeenCalledWith(walletAddress, signerAddress, chainId);
        });
        it('Given wallet params, then send right params to webauthn service', async () => {
            await walletService_1.default.importExternalSafe(projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData);
            expect(webAuthnSignerService_1.default.currentWebAuthnDeploymentParams).toHaveBeenCalledWith(chainId);
            expect(webAuthnSignerService_1.default.createWebAuthnSigner).toHaveBeenCalledWith({
                projectId,
                chainId,
                walletAddress,
                signerAddress,
                publicKeyId,
                publicKeyX,
                publicKeyY,
                deviceData,
                webAuthnDeploymentParams: {},
                isSharedWebAuthnSigner: true
            });
        });
    });
});
//# sourceMappingURL=walletService.spec.js.map