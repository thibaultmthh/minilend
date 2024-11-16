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
const mongoMock_1 = __importStar(require("../../tests/unit/mongoMock"));
const mongoService_1 = __importDefault(require("../services/mongoService"));
const sponsoredAddressRepository_1 = __importDefault(require("./sponsoredAddressRepository"));
const { SPONSORED_ADDRESS_COLLECTION } = sponsoredAddressRepository_1.default;
const { testIds } = mongoMock_1.default;
const CHAIN_ID = 137;
jest.mock('@/services/mongoService', () => ({
    getCollection: jest.fn()
}));
describe('SponsoredAddressRepository', () => {
    const { collectionsMocks, setupMongoMocks, expectCollectionFunctionToHaveBeenCalledWith } = (0, mongoMock_1.getMongoMockPack)([SPONSORED_ADDRESS_COLLECTION]);
    beforeEach(() => {
        setupMongoMocks(mongoService_1.default.getCollection);
        collectionsMocks[SPONSORED_ADDRESS_COLLECTION].collectionFunctions.insertOne.mockResolvedValue({});
        collectionsMocks[SPONSORED_ADDRESS_COLLECTION].collectionFunctions.findOne.mockResolvedValue({ targetAddress: '0x1' });
        collectionsMocks[SPONSORED_ADDRESS_COLLECTION].collectionFunctions.findOneAndDelete.mockResolvedValue({});
        collectionsMocks[SPONSORED_ADDRESS_COLLECTION].findFunctions.toArray.mockResolvedValue([{ targetAddress: '0x1' }]);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('insertSponsorAddress', () => {
        it(`Given an array of targetAddress, when inserting it in a collection, then format the object beforehand`, async () => {
            const targetAddress = '0x1';
            const projectId = testIds[0];
            await sponsoredAddressRepository_1.default.insertSponsoredAddress(projectId, targetAddress, CHAIN_ID);
            expectCollectionFunctionToHaveBeenCalledWith(SPONSORED_ADDRESS_COLLECTION, 'insertOne', {
                projectId: testIds[0],
                targetAddress,
                chainId: CHAIN_ID,
                isGlobal: false
            });
        });
    });
    describe('getSponsoredAddress', () => {
        it(`Given a targetAddress, when inserting the sponsoredAddresss it in a collection, then send right param`, async () => {
            const projectId = testIds[0];
            const targetAddress = '0x1';
            await sponsoredAddressRepository_1.default.getSponsoredAddress(projectId, targetAddress, CHAIN_ID);
            expectCollectionFunctionToHaveBeenCalledWith(SPONSORED_ADDRESS_COLLECTION, 'findOne', { projectId: testIds[0], targetAddress, chainId: CHAIN_ID }, {
                projection: {
                    _id: 0,
                    chainId: 1,
                    targetAddress: 1
                }
            });
        });
    });
    describe('getSponsoredAddressesByProjectId', () => {
        const projectId = testIds[0];
        it(`Given a find request, when querying all sponsoredAddresses, then send right param`, async () => {
            await sponsoredAddressRepository_1.default.getSponsoredAddressesByProjectId(projectId, CHAIN_ID, 20, 0);
            expectCollectionFunctionToHaveBeenCalledWith(SPONSORED_ADDRESS_COLLECTION, 'find', { projectId: testIds[0], chainId: CHAIN_ID }, {
                limit: 20,
                projection: {
                    _id: 0,
                    chainId: 1,
                    targetAddress: 1
                },
                skip: 0,
                sort: {
                    creationDate: -1
                }
            });
        });
    });
    describe('deleteSponsoredAddress', () => {
        it(`Given a targetAddress, when deleting the sponsoredAddresss in a collection, then send right param`, async () => {
            const targetAddress = '0x1';
            const projectId = testIds[0];
            await sponsoredAddressRepository_1.default.deleteSponsoredAddress(projectId, targetAddress, CHAIN_ID);
            expectCollectionFunctionToHaveBeenCalledWith(SPONSORED_ADDRESS_COLLECTION, 'findOneAndDelete', { projectId: testIds[0], targetAddress, chainId: CHAIN_ID });
        });
    });
});
//# sourceMappingURL=sponsoredAddressRepository.spec.js.map