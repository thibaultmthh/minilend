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
const mockdate_1 = __importDefault(require("mockdate"));
const mongoMock_1 = require("../../tests/unit/mongoMock");
const mongoService_1 = __importDefault(require("../services/mongoService"));
const testUtils_1 = require("../../tests/unit/testUtils");
const walletRepository_1 = __importStar(require("./walletRepository"));
const { WALLET_COLLECTION } = walletRepository_1.default;
jest.mock('@/services/mongoService', () => ({
    getCollection: jest.fn()
}));
const TEST_OBJECT_ID = mongoMock_1.testObjectIds[0];
const CHAIN_ID = '0x89';
describe('walletRepository', () => {
    const { collectionsMocks, setupMongoMocks, expectCollectionFunctionToHaveBeenCalledWith } = (0, mongoMock_1.getMongoMockPack)([WALLET_COLLECTION]);
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-17T22:00:00.000Z'));
    });
    beforeEach(() => {
        setupMongoMocks(mongoService_1.default.getCollection);
        collectionsMocks[WALLET_COLLECTION].collectionFunctions.findOneAndUpdate.mockResolvedValue(TEST_OBJECT_ID);
        collectionsMocks[WALLET_COLLECTION].collectionFunctions.findOne.mockResolvedValue(TEST_OBJECT_ID);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createWallet', () => {
        it(`Given an address and initiatorAddress, when inserting it, send the right parameters in function`, async () => {
            await walletRepository_1.default.createOrUpdateWallet(mongoMock_1.testIds[1], CHAIN_ID, '0x_address', new Date('2022-09-17T22:00:00.000Z'), '0x_initiator_address', testUtils_1.walletDeploymentParams);
            expectCollectionFunctionToHaveBeenCalledWith(WALLET_COLLECTION, 'findOneAndUpdate', {
                projectId: mongoMock_1.testIds[1],
                address: '0x_address',
                chainId: CHAIN_ID
            }, {
                $set: {
                    connectionDate: new Date('2022-09-17T22:00:00.000Z')
                },
                $setOnInsert: {
                    projectId: mongoMock_1.testIds[1],
                    chainId: CHAIN_ID,
                    address: '0x_address',
                    creationDate: new Date('2022-09-17T22:00:00.000Z'),
                    initiatorAddress: '0x_initiator_address',
                    deploymentParams: testUtils_1.walletDeploymentParams
                }
            }, {
                returnDocument: 'after',
                upsert: true
            });
        });
    });
    describe('getWalletByChain', () => {
        it(`Given an address and chainId, when getting a wallet, send the right parameters in function`, async () => {
            await walletRepository_1.default.getWalletByChain('projectId', 'chainId', 'address');
            expectCollectionFunctionToHaveBeenCalledWith(WALLET_COLLECTION, 'findOne', {
                projectId: 'projectId',
                chainId: 'chainId',
                address: 'address'
            });
        });
    });
    describe('getWalletForAllChains', () => {
        it(`Given an address and chainId, when getting a wallet, send the right parameters in function`, async () => {
            await walletRepository_1.default.getWalletForAllChains('projectId', 'address');
            expectCollectionFunctionToHaveBeenCalledWith(WALLET_COLLECTION, 'find', {
                projectId: 'projectId',
                address: 'address'
            }, { projection: walletRepository_1.walletProjection });
        });
    });
});
//# sourceMappingURL=walletRepository.spec.js.map