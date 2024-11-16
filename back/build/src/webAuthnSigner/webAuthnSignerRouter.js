"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthMiddleware_1 = __importDefault(require("../middleware/apiAuthMiddleware"));
const getValidateReqFieldMiddleware_1 = __importDefault(require("../middleware/getValidateReqFieldMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const webAuthnSignerSchema_1 = require("./validators/webAuthnSignerSchema");
const webAuthnSignerController_1 = __importDefault(require("./webAuthnSignerController"));
const webAuthnSignerRouter = (0, express_1.Router)({ mergeParams: true });
webAuthnSignerRouter.use(apiAuthMiddleware_1.default);
webAuthnSignerRouter.post('/create', (0, getValidateReqFieldMiddleware_1.default)('body', webAuthnSignerSchema_1.createWebAuthnSignerBodyParamsSchema), (0, wrapController_1.default)(webAuthnSignerController_1.default.createWebAuthnSigner));
webAuthnSignerRouter.get('/public-key-id/:publicKeyId', (0, getValidateReqFieldMiddleware_1.default)('params', webAuthnSignerSchema_1.publicKeyIdAsParamsSchema), (0, wrapController_1.default)(webAuthnSignerController_1.default.getProjectWebAuthnSignerByPublicKeyId));
webAuthnSignerRouter.get('/:walletAddress', (0, getValidateReqFieldMiddleware_1.default)('params', webAuthnSignerSchema_1.walletContractAsParamsSchema), (0, wrapController_1.default)(webAuthnSignerController_1.default.getProjectWebAuthnSignersByWalletAddress));
webAuthnSignerRouter.get('/:walletAddress/:chainId', (0, getValidateReqFieldMiddleware_1.default)('params', webAuthnSignerSchema_1.chainAndWalletAsParamsSchema), (0, wrapController_1.default)(webAuthnSignerController_1.default.getProjectWebAuthnSignersByWalletAddressAndChainId));
webAuthnSignerRouter.post('/predict-address', (0, getValidateReqFieldMiddleware_1.default)('body', webAuthnSignerSchema_1.predictWebAuthnSignerBodyParamsSchema), (0, wrapController_1.default)(webAuthnSignerController_1.default.predictWebAuthnSignerAddress));
exports.default = webAuthnSignerRouter;
//# sourceMappingURL=webAuthnSignerRouter.js.map