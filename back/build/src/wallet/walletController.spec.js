"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockdate_1 = __importDefault(require("mockdate"));
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const walletController_1 = __importDefault(require("./walletController"));
const walletService_1 = __importDefault(require("./walletService"));
jest.mock('./walletService', () => ({
    createOrUpdateWalletInDB: jest.fn(),
    getWalletForAllChains: jest.fn(),
    currentWalletDeploymentParams: jest.fn(),
    importExternalSafe: jest.fn()
}));
jest.mock('@/webAuthnSigner/webAuthnSignerService', () => ({
    deployWebAuthnSigner: jest.fn(),
    createWebAuthnSigner: jest.fn(),
    currentWebAuthnDeploymentParams: jest.fn()
}));
const EOA_TEST_ADDRESS = '0x53011E110CAd8685F4911508B4E2413f526Df73E';
const WALLET_ADDRESS = '0x6341a55dd860BBEEcc1614a27cC1fFa452397baD';
const CHAIN_ID = 137;
describe('walletController', () => {
    const { resMocks, setupResMocks, expectStatusAndPayloadWereSent } = expressMock_1.default.getExpressMockPack();
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-23'));
    });
    beforeEach(() => {
        setupResMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('getWalletForAllChains', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(walletService_1.default.getWalletForAllChains).mockResolvedValue([
                {
                    chainId: CHAIN_ID,
                    address: WALLET_ADDRESS,
                    initiatorAddress: EOA_TEST_ADDRESS,
                    creationDate: new Date('2022-09-23')
                }
            ]);
        });
        const req = expressMock_1.default.createTestReq({}, { walletAddress: WALLET_ADDRESS, chainId: CHAIN_ID }, undefined, undefined, {});
        it('Given a walletAddress, when getting the wallet infos, then send a success response with the wallet address', async () => {
            await walletController_1.default.getWalletForAllChains(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                wallets: [
                    {
                        chainId: CHAIN_ID,
                        address: WALLET_ADDRESS,
                        initiatorAddress: EOA_TEST_ADDRESS,
                        creationDate: new Date('2022-09-23')
                    }
                ]
            });
        });
        it('Given a walletAddress, when getting the wallet infos, then send proper params to service', async () => {
            await walletController_1.default.getWalletForAllChains(req, resMocks);
            expect(walletService_1.default.getWalletForAllChains).toHaveBeenCalledWith(undefined, WALLET_ADDRESS);
        });
    });
    describe('createWallet', () => {
        const projectId = 'project_1';
        const walletAddress = 'wallet_1';
        const initiatorAddress = 'signer_1';
        const chainId = 137;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(walletService_1.default.currentWalletDeploymentParams).mockReturnValue(testUtils_1.walletDeploymentParams);
            (0, testUtils_1.getFunctionMock)(walletService_1.default.createOrUpdateWalletInDB).mockResolvedValue({});
        });
        const req = expressMock_1.default.createTestReq({ _id: projectId }, undefined, {
            chainId: CHAIN_ID,
            walletAddress,
            initiatorAddress
        });
        it('Given all params, when init a Wallet, then send proper params to services', async () => {
            await walletController_1.default.createWallet(req, resMocks);
            expect(walletService_1.default.createOrUpdateWalletInDB).toHaveBeenCalledWith(projectId, chainId.toString(), walletAddress, initiatorAddress, testUtils_1.walletDeploymentParams);
        });
        it('Given all params, when init a Wallet, then send a success response with the walletAddress', async () => {
            await walletController_1.default.createWallet(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
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
            (0, testUtils_1.getFunctionMock)(walletService_1.default.importExternalSafe).mockResolvedValue(true);
        });
        const req = expressMock_1.default.createTestReq({ _id: projectId }, undefined, {
            chainId: CHAIN_ID,
            walletAddress,
            signerAddress,
            publicKeyId,
            publicKeyX,
            publicKeyY,
            deviceData
        });
        describe('import with webAuthn', () => {
            it('Given all params, when importing a safe already imported, then send a success response with the signerAddress and message', async () => {
                await walletController_1.default.importExternalSafe(req, resMocks);
                expectStatusAndPayloadWereSent(200, {
                    success: true,
                    signerAddress,
                    message: 'You can now add this address as owner of your safe !'
                });
            });
            it('Given all params, when importing a safe with webAuthn, then send proper params to services', async () => {
                await walletController_1.default.importExternalSafe(req, resMocks);
                expect(walletService_1.default.importExternalSafe).toHaveBeenCalledWith(projectId, chainId, walletAddress, signerAddress, publicKeyId, publicKeyX, publicKeyY, deviceData);
            });
        });
        describe('import with burner', () => {
            const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID }, undefined, {
                chainId: CHAIN_ID,
                walletAddress,
                signerAddress,
                publicKeyId: undefined,
                publicKeyX: undefined,
                publicKeyY: undefined,
                deviceData
            });
            it('Given all params, when importing a safe with burner, then send proper params to services', async () => {
                await walletController_1.default.importExternalSafe(req, resMocks);
                expect(walletService_1.default.importExternalSafe).toHaveBeenCalledWith(projectId, chainId, walletAddress, signerAddress, undefined, undefined, undefined, deviceData);
            });
        });
    });
});
//# sourceMappingURL=walletController.spec.js.map