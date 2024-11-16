"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockdate_1 = __importDefault(require("mockdate"));
const mongoMock_1 = require("../../tests/unit/mongoMock");
const mongoService_1 = __importDefault(require("../services/mongoService"));
const testUtils_1 = require("../../tests/unit/testUtils");
const webAuthnSignerRepository_1 = __importDefault(require("./webAuthnSignerRepository"));
const { WEBAUTHN_SIGNER_COLLECTION } = webAuthnSignerRepository_1.default;
jest.mock('@/services/mongoService', () => ({
    getCollection: jest.fn()
}));
const TEST_OBJECT_ID = mongoMock_1.testObjectIds[0];
describe('webAuthnSignerRepository', () => {
    const { collectionsMocks, setupMongoMocks, expectCollectionFunctionToHaveBeenCalledWith } = (0, mongoMock_1.getMongoMockPack)([WEBAUTHN_SIGNER_COLLECTION]);
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-17T22:00:00.000Z'));
    });
    beforeEach(() => {
        setupMongoMocks(mongoService_1.default.getCollection);
        collectionsMocks[WEBAUTHN_SIGNER_COLLECTION].collectionFunctions.findOneAndUpdate.mockResolvedValue(TEST_OBJECT_ID);
        collectionsMocks[WEBAUTHN_SIGNER_COLLECTION].collectionFunctions.findOne.mockResolvedValue({});
        collectionsMocks[WEBAUTHN_SIGNER_COLLECTION].findFunctions.toArray.mockResolvedValue([
            {
                webAuthnSigner: 'webAuthnSigner_1'
            }
        ]);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createWebAuthnSigner', () => {
        const projectId = mongoMock_1.testIds[0];
        const walletAddress = 'project_1';
        const publicKeyId = 'publicKey';
        const publicKeyX = '0x_x';
        const publicKeyY = '0x_y';
        const chainId = 137;
        const signerAddress = 'signerAddress';
        const deviceData = { browser: 'Chrome', os: 'macOS', platform: 'mobile' };
        const isSharedWebAuthnSigner = true;
        it(`Given webAuthn params, when inserting webAuthnSigner in db , send the right parameters in function`, async () => {
            await webAuthnSignerRepository_1.default.createWebAuthnSigner({
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
            expectCollectionFunctionToHaveBeenCalledWith(WEBAUTHN_SIGNER_COLLECTION, 'insertOne', {
                projectId: mongoMock_1.testIds[0],
                chainId: chainId.toString(),
                smartAccountAddress: walletAddress,
                publicKeyId,
                publicKeyX,
                publicKeyY,
                signerAddress,
                deviceData,
                deploymentParams: testUtils_1.webAuthnDeploymentParams,
                isSharedWebAuthnSigner,
                creationDate: new Date('2022-09-17T22:00:00.000Z')
            });
        });
    });
    describe('getwebAuthnSignerByPublicKeyId', () => {
        const projectId = mongoMock_1.testIds[0];
        const publicKeyId = '0x_publicKeyId_1';
        const chainId = 137;
        it(`Given a walletAdress, when getting webAuthnSigners , send the right parameters in function`, async () => {
            await webAuthnSignerRepository_1.default.getProjectWebAuthnSignerByPublicKeyId(projectId, publicKeyId, chainId);
            expectCollectionFunctionToHaveBeenCalledWith(WEBAUTHN_SIGNER_COLLECTION, 'findOne', {
                projectId: mongoMock_1.testIds[0],
                publicKeyId,
                chainId: chainId.toString()
            });
        });
    });
    describe('getProjectWebAuthnSignersByWalletAddress', () => {
        const projectId = mongoMock_1.testIds[0];
        const walletAddress = '0x_address';
        it(`Given a walletAdress, when getting webAuthnSigners, send the right parameters in function`, async () => {
            await webAuthnSignerRepository_1.default.getProjectWebAuthnSignersByWalletAddress(projectId, walletAddress);
            expectCollectionFunctionToHaveBeenCalledWith(WEBAUTHN_SIGNER_COLLECTION, 'find', {
                projectId: mongoMock_1.testIds[0],
                smartAccountAddress: walletAddress
            });
        });
    });
});
//# sourceMappingURL=webAuthnSignerRepository.spec.js.map