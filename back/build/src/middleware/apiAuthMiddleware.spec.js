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
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const apiAuthMiddleware_1 = __importStar(require("../middleware/apiAuthMiddleware"));
describe('apiKeyAuthMiddleware', () => {
    const res = {};
    const next = jest.fn();
    const projectId = 'project_id';
    const chainId = 137;
    const kongHeaders = {
        'x-consumer-username': projectId,
        'x-consumer-groups': 'connect',
        'x-consumer-access': apiAuthMiddleware_1.ApiKeyAccess.PUBLIC,
        'x-project-chain-id': chainId.toString()
    };
    let req = {};
    const _callMiddlewareWithHeaders = (headers, require) => {
        req = { headers };
        (0, apiAuthMiddleware_1.default)(req, res, next);
        (0, apiAuthMiddleware_1.accessAuthMiddleware)(require)(req, res, next);
    };
    const _expectInvalidApiKeyToHaveBeenSent = () => {
        expect(next).toHaveBeenCalledWith((0, http_errors_1.Forbidden)('Request not authenticated, requires a valid apikey'));
    };
    const _expectInsufficientAccessApiKeyToHaveBeenSent = () => {
        expect(next).toHaveBeenCalledWith((0, http_errors_1.Forbidden)("ApiKey doesn't have the required access level"));
    };
    beforeAll(() => {
        req = {};
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('Success', () => {
        it('Given some header in request, when a user matches the api key, then let the API call follow through', async () => {
            _callMiddlewareWithHeaders(kongHeaders, [apiAuthMiddleware_1.ApiKeyAccess.PUBLIC]);
            expect(req.chainId).toBe(chainId);
            expect(req.projectId).toBe(projectId);
            expect(next).toHaveBeenCalledWith();
        });
    });
    describe('Forbidden', () => {
        it('Given some header in request, when no api key has been sent, then send a forbidden error', async () => {
            _callMiddlewareWithHeaders({}, [apiAuthMiddleware_1.ApiKeyAccess.PUBLIC]);
            _expectInvalidApiKeyToHaveBeenSent();
        });
        it('Given some header in request, when api key has wrong access, then send a forbidden error', async () => {
            _callMiddlewareWithHeaders(kongHeaders, [apiAuthMiddleware_1.ApiKeyAccess.SECRET]);
            _expectInsufficientAccessApiKeyToHaveBeenSent();
        });
    });
});
//# sourceMappingURL=apiAuthMiddleware.spec.js.map