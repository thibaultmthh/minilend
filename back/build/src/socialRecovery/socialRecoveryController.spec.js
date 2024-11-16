"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const socialRecoveryController_1 = __importDefault(require("./socialRecoveryController"));
const socialRecoveryService_1 = __importDefault(require("./socialRecoveryService"));
jest.mock('./socialRecoveryService', () => ({
    startRecoveryRequest: jest.fn(),
    finalizeRecoveryRequest: jest.fn()
}));
const CHAIN_ID = 137;
describe('socialRecoveryController', () => {
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
    describe('startRecovery', () => {
        const projectId = 'id_1';
        const walletAddress = '0x_address';
        const newThreshold = 1;
        const publicKeyId = 'publicKey';
        const publicKeyX = '0x_x';
        const publicKeyY = '0x_y';
        const newOwner = '0x_signer';
        const req = expressMock_1.default.createTestReq({ _id: projectId }, {}, {
            chainId: CHAIN_ID,
            walletAddress,
            newOwner,
            newThreshold,
            publicKeyId,
            publicKeyX,
            publicKeyY
        });
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(socialRecoveryService_1.default.startRecoveryRequest).mockResolvedValue({});
        });
        it('Given a projectId, walletAddress, newOwners and newThreshold, when starting a recovery, then send a success response with the safeTxHash', async () => {
            await socialRecoveryController_1.default.startRecovery(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
        });
        it('Given a projectId, walletAddress, newOwners and newThreshold, when starting a recovery, then send proper params to service', async () => {
            const passkey = {
                publicKeyId,
                publicKeyX,
                publicKeyY
            };
            await socialRecoveryController_1.default.startRecovery(req, resMocks);
            expect(socialRecoveryService_1.default.startRecoveryRequest).toHaveBeenCalledWith(projectId, CHAIN_ID, walletAddress, newOwner, passkey, newThreshold);
        });
    });
    describe('finalizeRecovery', () => {
        const walletAddress = '0x_address';
        const projectId = 'id_1';
        const req = expressMock_1.default.createTestReq({ _id: projectId }, {}, {
            chainId: CHAIN_ID,
            walletAddress
        }, undefined, {});
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(socialRecoveryService_1.default.finalizeRecoveryRequest).mockResolvedValue({});
        });
        it('Given a projectId and walletAddress, when finalizing a recovery, then send a success response with the safeTxHash', async () => {
            await socialRecoveryController_1.default.finalizeRecovery(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
        });
        it('Given a projectId and walletAddress, when finalizing a recovery, then send proper params to service', async () => {
            await socialRecoveryController_1.default.finalizeRecovery(req, resMocks);
            expect(socialRecoveryService_1.default.finalizeRecoveryRequest).toHaveBeenCalledWith(projectId, CHAIN_ID, walletAddress);
        });
    });
});
//# sourceMappingURL=socialRecoveryController.spec.js.map