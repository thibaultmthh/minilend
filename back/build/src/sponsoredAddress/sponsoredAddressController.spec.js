"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const sponsoredAddressController_1 = __importDefault(require("./sponsoredAddressController"));
const sponsoredAddressService_1 = __importDefault(require("./sponsoredAddressService"));
jest.mock('./sponsoredAddressService', () => ({
    createSponsoredAddress: jest.fn(),
    getProjectSponsoredAddresses: jest.fn(),
    deleteSponsoredAddress: jest.fn()
}));
const CHAIN_ID = 137;
describe('sponsoredAddressController', () => {
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
    describe('createSponsoredAddresses', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressService_1.default.createSponsoredAddress).mockResolvedValue({});
        });
        const targetAddress = '0x1';
        const projectId = 'id_1';
        const req = expressMock_1.default.createTestReq({
            _id: projectId,
            chainId: CHAIN_ID
        }, {}, {
            targetAddress
        });
        it('Given a targetAddress and projectId, when inserting in db, then send a success response', async () => {
            await sponsoredAddressController_1.default.createSponsoredAddress(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
        });
        it('Given a targetAddress and projectId, when inserting in db, then send proper params to service', async () => {
            await sponsoredAddressController_1.default.createSponsoredAddress(req, resMocks);
            expect(sponsoredAddressService_1.default.createSponsoredAddress).toHaveBeenCalledWith(projectId, targetAddress, CHAIN_ID);
        });
    });
    describe('getProjectSponsoredAddresses', () => {
        const sponsoredAddresses = ['0x1', '0x2', '0x3'];
        const projectId = 'id_1';
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressService_1.default.getProjectSponsoredAddresses).mockResolvedValue(sponsoredAddresses);
        });
        const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID });
        it('Given an request to getSponsoredAddressesByProjectId, when querying all sponsoredAddresses, then send a success response with the addresses in the payload', async () => {
            await sponsoredAddressController_1.default.getProjectSponsoredAddresses(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                sponsoredAddresses
            });
        });
        it('Given an request to getSponsoredAddressesByProjectId, when querying all sponsoredAddresses, then send proper params to service', async () => {
            await sponsoredAddressController_1.default.getProjectSponsoredAddresses(req, resMocks);
            expect(sponsoredAddressService_1.default.getProjectSponsoredAddresses).toHaveBeenCalledWith({ projectId, chainId: CHAIN_ID });
        });
    });
    describe('deleteSponsoredAddresses', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressService_1.default.deleteSponsoredAddress).mockResolvedValue({});
        });
        const targetAddress = '0x1';
        const projectId = 'id_1';
        const req = expressMock_1.default.createTestReq({ _id: projectId, chainId: CHAIN_ID }, { targetAddress });
        it('Given a targetAddress and projectId, when deleting in db, then send a success response', async () => {
            await sponsoredAddressController_1.default.deleteSponsoredAddress(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
        });
        it('Given a targetAddress and projectId, when deleting in db, then send proper params to service', async () => {
            await sponsoredAddressController_1.default.deleteSponsoredAddress(req, resMocks);
            expect(sponsoredAddressService_1.default.deleteSponsoredAddress).toHaveBeenCalledWith(projectId, targetAddress, CHAIN_ID);
        });
    });
});
//# sourceMappingURL=sponsoredAddressController.spec.js.map