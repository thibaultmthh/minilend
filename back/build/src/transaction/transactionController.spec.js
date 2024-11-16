"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const testUtils_1 = require("../../tests/unit/testUtils");
const transactionController_1 = __importDefault(require("./transactionController"));
const transactionRepository_1 = __importDefault(require("./transactionRepository"));
const transactionService_1 = __importDefault(require("./transactionService"));
jest.mock('./transactionService', () => ({
    getProjectTransactions: jest.fn(),
    getProjectTransactionsByDate: jest.fn(),
    getRelayedTransaction: jest.fn()
}));
jest.mock('./transactionRepository', () => ({
    getTransactionsCountByProjectId: jest.fn()
}));
describe('transactionController', () => {
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
    describe('getProjectTransactions', () => {
        const transactions = ['0x1', '0x2', '0x3'];
        const totalTransactions = 3;
        const projectId = 'id_1';
        const limit = 10;
        const offset = 1;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(transactionService_1.default.getProjectTransactions).mockResolvedValue(transactions);
            (0, testUtils_1.getFunctionMock)(transactionRepository_1.default.getTransactionsCountByProjectId).mockResolvedValue(transactions.length);
        });
        const req = expressMock_1.default.createTestReq({}, { projectId }, undefined, {
            limit,
            offset
        });
        it('Given an request to getProjectTransactions, when querying all project transactions, then send a success response with the transactions in the payload', async () => {
            await transactionController_1.default.getProjectTransactions(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                transactions,
                pagination: {
                    limit,
                    offset,
                    total: totalTransactions
                }
            });
        });
        it('Given an request to getProjectTransactions, when querying all project transactions, then send proper params to service and repository', async () => {
            await transactionController_1.default.getProjectTransactions(req, resMocks);
            expect(transactionService_1.default.getProjectTransactions).toHaveBeenCalledWith(projectId, limit, offset);
            expect(transactionRepository_1.default.getTransactionsCountByProjectId).toHaveBeenCalledWith(projectId);
        });
    });
    describe('getProjectTransactionsByDate', () => {
        const transactions = ['0x1', '0x2', '0x3'];
        const projectId = 'id_1';
        const start = Date.now();
        const end = Date.now() - 1000;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(transactionService_1.default.getProjectTransactionsByDate).mockResolvedValue(transactions);
            (0, testUtils_1.getFunctionMock)(transactionRepository_1.default.getTransactionsCountByProjectId).mockResolvedValue(transactions.length);
        });
        const req = expressMock_1.default.createTestReq({}, { projectId }, undefined, {
            start,
            end
        });
        it('Given an request to getProjectTransactionsByDate, when querying all project transactions, then send a success response with the transactions in the payload', async () => {
            await transactionController_1.default.getProjectTransactionsByDate(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                transactions
            });
        });
        it('Given an request to getProjectTransactionsByDate, when querying all project transactions, then send proper params to service and repository', async () => {
            await transactionController_1.default.getProjectTransactionsByDate(req, resMocks);
            expect(transactionService_1.default.getProjectTransactionsByDate).toHaveBeenCalledWith(projectId, new Date(start), new Date(end));
        });
    });
    describe('getRelayedTransaction', () => {
        const relayId = '0x1';
        const chainId = 137;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(transactionService_1.default.getRelayedTransaction).mockResolvedValue({ id: relayId });
        });
        const req = expressMock_1.default.createTestReq({ chainId }, { relayId });
        it('Given an request to getRelayedTransaction, when querying relayed transaction, then send a success response with the transaction in the payload', async () => {
            await transactionController_1.default.getRelayedTransaction(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                relayedTransaction: {
                    id: relayId
                }
            });
        });
        it('Given an request to getRelayedTransaction, when querying all project transactions, then send proper params to service', async () => {
            await transactionController_1.default.getRelayedTransaction(req, resMocks);
            expect(transactionService_1.default.getRelayedTransaction).toHaveBeenCalledWith(relayId, chainId);
        });
    });
});
//# sourceMappingURL=transactionController.spec.js.map