"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../../src/../tests/unit/testUtils");
const DEFAULT_CHAIN_ID = 137;
const getExpressMockPack = () => {
    const statusMock = jest.fn();
    const jsonMock = jest.fn();
    const resMocks = {
        status: statusMock,
        json: jsonMock
    };
    const setupResMocks = () => {
        (0, testUtils_1.getFunctionMock)(statusMock).mockReturnValue(resMocks);
    };
    const expectStatusAndPayloadWereSent = (status, payload) => {
        if (status) {
            expect(resMocks.status).toHaveBeenCalledWith(status);
        }
        expect(resMocks.json).toHaveBeenCalledWith(payload);
    };
    return {
        resMocks,
        setupResMocks,
        expectStatusAndPayloadWereSent
    };
};
const createTestReq = (project, params = {}, body = {}, query = {}, headers = {}) => {
    const request = {
        params,
        body,
        query,
        headers
    };
    if (project) {
        return {
            projectId: project._id || undefined,
            chainId: project.chainId || DEFAULT_CHAIN_ID,
            ...request
        };
    }
    return request;
};
exports.default = {
    getExpressMockPack,
    createTestReq
};
//# sourceMappingURL=expressMock.js.map