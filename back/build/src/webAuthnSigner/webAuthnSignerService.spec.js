"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoMock_1 = require("../../tests/unit/mongoMock");
const testUtils_1 = require("../../tests/unit/testUtils");
const webAuthnSignerRepository_1 = __importDefault(require("./webAuthnSignerRepository"));
const webAuthnSignerService_1 = __importDefault(require("./webAuthnSignerService"));
jest.mock('./webAuthnSignerRepository', () => ({
    createWebAuthnSigner: jest.fn(),
    getProjectwebAuthnSigners: jest.fn(),
    getProjectWebAuthnSignerByPublicKeyId: jest.fn(),
    getProjectWebAuthnSignersByUserId: jest.fn()
}));
describe('webAuthnSignerService', () => {
    const projectId = 'project_1';
    const walletAddress = 'wallet_1';
    const chainId = 137;
    const publicKeyId = 'publicKey';
    const publicKeyX = '0x_x';
    const publicKeyY = '0x_y';
    const signerAddress = '0x_signer';
    const deviceData = { browser: 'Chrome', os: 'macOS', platform: 'mobile' };
    const isSharedWebAuthnSigner = true;
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createWebAuthnSigner', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerRepository_1.default.createWebAuthnSigner).mockResolvedValue('webAuthnSigner_1');
        });
        it(`Given webAuthn params, when creating webAuthnSigner , then send the right params to repo`, async () => {
            await webAuthnSignerService_1.default.createWebAuthnSigner({
                projectId,
                chainId,
                walletAddress,
                publicKeyId,
                publicKeyX,
                publicKeyY,
                deviceData,
                isSharedWebAuthnSigner,
                signerAddress,
                webAuthnDeploymentParams: testUtils_1.webAuthnDeploymentParams
            });
            expect(webAuthnSignerRepository_1.default.createWebAuthnSigner).toHaveBeenCalledWith({
                projectId,
                chainId,
                smartAccountAddress: walletAddress,
                publicKeyId,
                publicKeyX,
                publicKeyY,
                signerAddress,
                deviceData,
                webAuthnDeploymentParams: testUtils_1.webAuthnDeploymentParams,
                isSharedWebAuthnSigner
            });
        });
    });
    describe('getProjectWebAuthnSignerByPublicKeyId', () => {
        const projectId = mongoMock_1.testIds[0];
        const publicKeyId = '0x_publicKeyId';
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(webAuthnSignerRepository_1.default.getProjectWebAuthnSignerByPublicKeyId).mockResolvedValue('webAuthnSigner_1');
        });
        it(`Given an projectId and publicKeyId, when getting the associated webAuthnSigner, then send right params to repository`, async () => {
            await webAuthnSignerService_1.default.getProjectWebAuthnSignerByPublicKeyId(projectId, publicKeyId);
            expect(webAuthnSignerRepository_1.default.getProjectWebAuthnSignerByPublicKeyId).toHaveBeenCalledWith(projectId, publicKeyId, chainId);
        });
        it(`Given an projectId and publicKeyId, when getting the associated webAuthnSigner, then return the webAuthnSigner`, async () => {
            const webAuthnSigner = await webAuthnSignerService_1.default.getProjectWebAuthnSignerByPublicKeyId(projectId, publicKeyId);
            expect(webAuthnSigner).toEqual([
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1',
                'webAuthnSigner_1'
            ]);
        });
    });
});
//# sourceMappingURL=webAuthnSignerService.spec.js.map