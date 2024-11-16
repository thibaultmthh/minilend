"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockdate_1 = __importDefault(require("mockdate"));
const mongoMock_1 = require("../../tests/unit/mongoMock");
const mongoService_1 = __importDefault(require("../services/mongoService"));
const relayContext_1 = require("../services/relayService/relayContext");
const transactionRepository_1 = __importDefault(require("./transactionRepository"));
const { TRANSACTION_COLLECTION } = transactionRepository_1.default;
jest.mock('@/services/mongoService', () => ({
    getCollection: jest.fn()
}));
describe('transactionRepository', () => {
    const { collectionsMocks, setupMongoMocks, expectCollectionFunctionToHaveBeenCalledWith } = (0, mongoMock_1.getMongoMockPack)([TRANSACTION_COLLECTION]);
    beforeEach(() => {
        setupMongoMocks(mongoService_1.default.getCollection);
        collectionsMocks[TRANSACTION_COLLECTION].collectionFunctions.insertOne.mockResolvedValue({});
    });
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-23'));
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('insertTransaction', () => {
        const transaction = {
            chainId: 137,
            to: '0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3',
            data: '0x01234',
            relayId: 'relay_id',
            relayType: 'COMETH_RELAYER',
            sentDate: new Date('2022-09-23'),
            projectId: mongoMock_1.testIds[0],
            walletAddress: 'wallet_Address',
            relayContext: relayContext_1.RelayContext.FINALIZE_RECOVERY,
            isSponsored: true
        };
        it(`Given an address and nonce, when inserting it, send the right parameters in function`, async () => {
            await transactionRepository_1.default.insertTransaction(transaction);
            expectCollectionFunctionToHaveBeenCalledWith(TRANSACTION_COLLECTION, 'insertOne', {
                chainId: 137,
                to: '0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3',
                data: '0x01234',
                relayId: 'relay_id',
                relayType: 'COMETH_RELAYER',
                sentDate: new Date('2022-09-23'),
                projectId: mongoMock_1.testIds[0],
                walletAddress: 'wallet_Address',
                relayContext: relayContext_1.RelayContext.FINALIZE_RECOVERY,
                isSponsored: true
            });
        });
    });
    describe('getTransactionsByProjectId', () => {
        const projectId = mongoMock_1.testIds[0];
        const limit = 20;
        const offset = 0;
        it(`Given a find request, when querying all sponsoredAddresses, then send right param`, async () => {
            await transactionRepository_1.default.getTransactionsByProjectId(projectId, limit, offset);
            expectCollectionFunctionToHaveBeenCalledWith(TRANSACTION_COLLECTION, 'find', { projectId: mongoMock_1.testIds[0] }, {
                projection: {
                    _id: 0,
                    chainId: 1,
                    to: 1,
                    data: 1,
                    relayId: 1,
                    relayType: 1,
                    sentDate: 1,
                    projectId: 1,
                    walletAddress: 1,
                    relayContext: 1,
                    isSponsored: 1
                },
                sort: {
                    sentDate: -1
                },
                skip: offset,
                limit: limit
            });
        });
    });
    describe('getTransactionsByProjectIdAndDate', () => {
        const projectId = mongoMock_1.testIds[0];
        const start = new Date();
        const end = new Date(Date.now() - 1000);
        it(`Given a find request, when querying all sponsoredAddresses, then send right param`, async () => {
            await transactionRepository_1.default.getTransactionsByProjectIdAndDate(projectId, start, end);
            expectCollectionFunctionToHaveBeenCalledWith(TRANSACTION_COLLECTION, 'find', {
                projectId: mongoMock_1.testIds[0],
                sentDate: {
                    $gte: start,
                    $lte: end
                }
            }, {
                projection: {
                    _id: 0,
                    chainId: 1,
                    to: 1,
                    data: 1,
                    relayId: 1,
                    relayType: 1,
                    sentDate: 1,
                    projectId: 1,
                    walletAddress: 1,
                    relayContext: 1,
                    isSponsored: 1
                },
                sort: {
                    sentDate: -1
                }
            });
        });
    });
    describe('getTransactionsCountByProjectId', () => {
        const projectId = mongoMock_1.testIds[0];
        it(`Given a projectId, when counting the number of transactions then send right param`, async () => {
            await transactionRepository_1.default.getTransactionsCountByProjectId(projectId);
            expectCollectionFunctionToHaveBeenCalledWith(TRANSACTION_COLLECTION, 'countDocuments', { projectId: mongoMock_1.testIds[0] });
        });
    });
});
//# sourceMappingURL=transactionRepository.spec.js.map