"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviderMockPack = void 0;
const testUtils_1 = require("../../src/../tests/unit/testUtils");
const blockchainService_1 = __importDefault(require("../../src/services/blockchainService"));
const getProviderMockPack = () => {
    const providerMocks = {
        estimateGas: jest.fn(),
        send: jest.fn(),
        call: jest.fn()
    };
    const setupProviderMocks = () => {
        (0, testUtils_1.getFunctionMock)(blockchainService_1.default.getProvider).mockImplementation(() => {
            return providerMocks;
        });
    };
    const expectProviderFunctionToHaveBeenCalledWith = (functionName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...params) => {
        expect(providerMocks[functionName]).toHaveBeenCalledWith(...params);
    };
    return {
        providerMocks,
        setupProviderMocks,
        expectProviderFunctionToHaveBeenCalledWith
    };
};
exports.getProviderMockPack = getProviderMockPack;
exports.default = { getProviderMockPack: exports.getProviderMockPack };
//# sourceMappingURL=providerMock.js.map