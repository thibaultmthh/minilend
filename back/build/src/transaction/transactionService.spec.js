"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const mongoMock_1 = require("../../tests/unit/mongoMock");
const testUtils_1 = require("../../tests/unit/testUtils");
const comethRelay_1 = __importDefault(require("../services/relayService/comethRelay"));
const relayService_1 = __importDefault(require("../services/relayService/relayService"));
const transactionRepository_1 = __importDefault(require("./transactionRepository"));
const transactionService_1 = __importDefault(require("./transactionService"));
jest.mock('./transactionRepository', () => ({
    getTransactionsByProjectId: jest.fn(),
    getTransactionsByProjectIdAndDate: jest.fn()
}));
jest.mock('@/services/relayService/comethRelay', () => ({
    getRelayInfos: jest.fn()
}));
describe('transactionService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    const transactions = [
        {
            projectId: mongoMock_1.testIds[0],
            walletAddress: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            chainId: 137,
            to: '0xcA11bde05977b3631167028862bE2a173976CA11',
            data: '0x252dba420000000000000000000000000000000',
            relayContext: 'DEPLOY_AND_SAFETX',
            isSponsored: true,
            sentDate: new Date('2023-08-09T12:51:31.879Z'),
            relayId: '64d3605fe3c739711f778c44',
            relayType: 'COMETH'
        },
        {
            projectId: mongoMock_1.testIds[0],
            walletAddress: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            chainId: 137,
            to: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            data: '0x6a76120200000000000000000000000084add3fa2c2463c8cf2c95ad',
            relayContext: 'SAFE_TX',
            isSponsored: true,
            sentDate: new Date('2023-08-09T12:51:31.879Z'),
            relayId: '64d3612ee3c739711f778c45',
            relayType: 'DEFENDER'
        }
    ];
    const relayedTransactionInfo = {
        id: '64d3605fe3c739711f778c44',
        to: '0xcA11bde05977b3631167028862bE2a173976CA11',
        data: '0x252dba420',
        isSponsored: true,
        status: {
            received: {
                date: new Date('2023-08-09T12:51:31.879Z')
            },
            attributed: {
                date: new Date('2023-08-09T12:51:31.879Z'),
                relayerAddress: '0x84add3fa2c2463c8cf2c95ad'
            },
            sent: {
                date: new Date('2023-08-09T12:51:31.879Z'),
                hash: '0x84add3fa2c2463c8cf2c95ad',
                gasLimit: '1000000',
                maxPriorityFeePerGas: '1000000000',
                maxFeePerGas: '1000000000',
                nonce: 1
            },
            confirmed: {
                date: new Date('2023-08-09T12:51:31.879Z'),
                hash: '0x84add3fa2c2463c8cf2c95ad',
                gasUsed: '1000000',
                effectiveGasPrice: '1000000000',
                status: 1
            }
        }
    };
    const transactionWithInfos = [
        {
            projectId: mongoMock_1.testIds[0],
            walletAddress: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            chainId: 137,
            to: '0xcA11bde05977b3631167028862bE2a173976CA11',
            data: '0x252dba420000000000000000000000000000000',
            relayContext: 'DEPLOY_AND_SAFETX',
            isSponsored: true,
            sentDate: new Date('2023-08-09T12:51:31.879Z'),
            relayId: '64d3605fe3c739711f778c44',
            relayType: 'COMETH',
            relayInfos: relayedTransactionInfo
        },
        {
            projectId: mongoMock_1.testIds[0],
            walletAddress: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            chainId: 137,
            to: '0xCE2C8a804C2a6372826fA3A0335168854CfbFe90',
            data: '0x6a76120200000000000000000000000084add3fa2c2463c8cf2c95ad',
            relayContext: 'SAFE_TX',
            isSponsored: true,
            sentDate: new Date('2023-08-09T12:51:31.879Z'),
            relayId: '64d3612ee3c739711f778c45',
            relayType: 'DEFENDER',
            relayInfos: undefined
        }
    ];
    describe('getRelayedTransaction', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(comethRelay_1.default.getRelayInfos).mockImplementation((relayId) => {
                if (relayId == '64d3612ee3c739711f778c45')
                    return undefined;
                return relayedTransactionInfo;
            });
        });
        it(`Given unknown relayId, when getting the relayed transactions, then return 404`, async () => {
            const relayId = '64d3612ee3c739711f778c45';
            const chainId = 137;
            await expect(transactionService_1.default.getRelayedTransaction(relayId, chainId)).rejects.toThrow((0, http_errors_1.NotFound)(`Relayed Transaction id(${relayId}) not found on chainId(${chainId})`));
        });
        it(`Given a relayId, when getting the relayed transactions, then return the transaction`, async () => {
            const result = await transactionService_1.default.getRelayedTransaction('64d3605fe3c739711f778c44', 137);
            expect(result).toEqual(relayedTransactionInfo);
        });
    });
    describe('getProjectTransactions', () => {
        const projectId = '6421c16ad82ff1c30aaa11f7';
        const limit = 20;
        const offset = 0;
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(transactionRepository_1.default.getTransactionsByProjectId).mockResolvedValue(transactionWithInfos);
            (0, testUtils_1.getFunctionMock)(comethRelay_1.default.getRelayInfos).mockImplementation((relayId) => {
                if (relayId == '64d3612ee3c739711f778c45')
                    return undefined;
                return relayedTransactionInfo;
            });
        });
        it(`Given a projectId, when getting the project transactions, then send right params to repository`, async () => {
            await transactionService_1.default.getProjectTransactions(projectId, limit, offset);
            expect(transactionRepository_1.default.getTransactionsByProjectId).toHaveBeenCalledWith(projectId, limit, offset);
        });
        it(`Given a projectId, when getting the project transactions, then send right params to relayService`, async () => {
            const getRelayInfosSpy = jest.spyOn(relayService_1.default, 'getRelayInfos');
            await transactionService_1.default.getProjectTransactions(projectId, limit, offset);
            expect(getRelayInfosSpy).toHaveBeenCalledWith('64d3605fe3c739711f778c44', 137, 'COMETH');
            expect(getRelayInfosSpy).toHaveBeenCalledWith('64d3612ee3c739711f778c45', 137, 'DEFENDER');
        });
        it(`Given a projectId, when getting the project transactions, then return the transactions`, async () => {
            const result = await transactionService_1.default.getProjectTransactions(projectId, limit, offset);
            expect(result).toEqual(transactionWithInfos);
        });
    });
    describe('getProjectTransactionsByDate', () => {
        const projectId = '6421c16ad82ff1c30aaa11f7';
        const start = new Date();
        const end = new Date(Date.now() - 1000);
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(transactionRepository_1.default.getTransactionsByProjectIdAndDate).mockResolvedValue(transactions);
        });
        it(`Given a projectId, when getting the project transactions, then send right params to repository`, async () => {
            await transactionService_1.default.getProjectTransactionsByDate(projectId, start, end);
            expect(transactionRepository_1.default.getTransactionsByProjectIdAndDate).toHaveBeenCalledWith(projectId, start, end);
        });
        it(`Given a projectId, when getting the project transactions, then return the transactions`, async () => {
            const result = await transactionService_1.default.getProjectTransactionsByDate(projectId, start, end);
            expect(result).toEqual(transactions);
        });
    });
});
//# sourceMappingURL=transactionService.spec.js.map