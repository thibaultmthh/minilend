"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const webAuthnSignerService_1 = __importDefault(require("../webAuthnSigner/webAuthnSignerService"));
const webAuthnSignerController_1 = __importDefault(require("./webAuthnSignerController"));
jest.mock('@/webAuthnSigner/webAuthnSignerService', () => ({
    getProjectWebAuthnSignerByPublicKeyId: jest.fn(),
    createAddDeviceRequest: jest.fn(),
    getProjectWebAuthnSignersByWalletAddress: jest.fn(),
    predictSignerAddress: jest.fn(),
    currentWebAuthnDeploymentParams: jest.fn()
}));
const CHAIN_ID = 137;
describe('webAuthnSignerController', () => {
    const { resMocks, setupResMocks, expectStatusAndPayloadWereSent } = expressMock_1.default.getExpressMockPack();
    beforeEach(() => {
        setupResMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('getProjectWebAuthnSignerByPublicKeyId', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.getProjectWebAuthnSignerByPublicKeyId).mockResolvedValue(['webAuthnSigner_1']);
        });
        const projectId = 'project_1';
        const publicKeyId = 'id_1';
        const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID }, { publicKeyId });
        it('Given a publicKeyId and projectId, when getting the associated webAuthnSigner, then send a success response with payload', async () => {
            await webAuthnSignerController_1.default.getProjectWebAuthnSignerByPublicKeyId(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                webAuthnSigners: ['webAuthnSigner_1']
            });
        });
        it('Given a publicKeyId and projectId, when getting the associated webAuthnSigner, then send proper params to service', async () => {
            await webAuthnSignerController_1.default.getProjectWebAuthnSignerByPublicKeyId(req, resMocks);
            expect(webAuthnSignerService_1.default.getProjectWebAuthnSignerByPublicKeyId).toHaveBeenCalledWith(projectId, publicKeyId);
        });
    });
    describe('getProjectWebAuthnSignersByWalletAddress', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.getProjectWebAuthnSignersByWalletAddress).mockResolvedValue(['webAuthnSigner_1']);
        });
        const projectId = 'id_1';
        const walletAddress = '0x_walletAddress';
        const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID }, { walletAddress });
        it('Given a publicKeyId and projectId, when getting the associated webAuthnSigner, then send a success response with payload', async () => {
            await webAuthnSignerController_1.default.getProjectWebAuthnSignersByWalletAddress(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                webAuthnSigners: ['webAuthnSigner_1']
            });
        });
        it('Given a publicKeyId and projectId, when getting the associated webAuthnSigner, then send proper params to service', async () => {
            await webAuthnSignerController_1.default.getProjectWebAuthnSignersByWalletAddress(req, resMocks);
            expect(webAuthnSignerService_1.default.getProjectWebAuthnSignersByWalletAddress).toHaveBeenCalledWith(projectId, walletAddress);
        });
    });
    describe('predictWebAuthnSignerAddress', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerService_1.default.predictSignerAddress).mockResolvedValue('0x_signerAddress');
        });
        const projectId = 'id_1';
        const publicKeyX = '0x_x';
        const publicKeyY = '0x_y';
        const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID }, undefined, { publicKeyX, publicKeyY });
        it('Given a publicKeyX and publicKeyY, when predicting a webAuthnsigner address, then send a success response with payload', async () => {
            await webAuthnSignerController_1.default.predictWebAuthnSignerAddress(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                signerAddress: '0x_signerAddress'
            });
        });
        it('Given a publicKeyX and publicKeyY, when predicting a webAuthnsigner address then send proper params to service', async () => {
            await webAuthnSignerController_1.default.predictWebAuthnSignerAddress(req, resMocks);
            expect(webAuthnSignerService_1.default.predictSignerAddress).toHaveBeenCalledWith(publicKeyX, publicKeyY, CHAIN_ID);
        });
    });
});
//# sourceMappingURL=webAuthnSignerController.spec.js.map