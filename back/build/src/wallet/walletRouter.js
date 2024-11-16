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
const express_1 = require("express");
const apiAuthMiddleware_1 = __importStar(require("../middleware/apiAuthMiddleware"));
const getValidateReqFieldMiddleware_1 = __importDefault(require("../middleware/getValidateReqFieldMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const walletSchema_1 = require("./validators/walletSchema");
const walletController_1 = __importDefault(require("./walletController"));
const walletRouter = (0, express_1.Router)({ mergeParams: true });
walletRouter.use(apiAuthMiddleware_1.default);
walletRouter.post('/is-valid-signature/:walletAddress', (0, getValidateReqFieldMiddleware_1.default)('params', walletSchema_1.walletContractAsParamsSchema), (0, getValidateReqFieldMiddleware_1.default)('body', walletSchema_1.walletIsValidSignatureBodyParamsSchema), (0, wrapController_1.default)(walletController_1.default.isValidSignature));
walletRouter.post('/', (0, getValidateReqFieldMiddleware_1.default)('body', walletSchema_1.createWalletSchema), (0, wrapController_1.default)(walletController_1.default.createWallet));
walletRouter.get('/:walletAddress', (0, getValidateReqFieldMiddleware_1.default)('params', walletSchema_1.walletContractAsParamsSchema), (0, wrapController_1.default)(walletController_1.default.getWalletForAllChains));
walletRouter.post('/import', (0, getValidateReqFieldMiddleware_1.default)('body', walletSchema_1.importBodyParamsSchema), (0, wrapController_1.default)(walletController_1.default.importExternalSafe));
walletRouter.get('/', (0, getValidateReqFieldMiddleware_1.default)('query', walletSchema_1.getWalletsQuerySchema), (0, apiAuthMiddleware_1.accessAuthMiddleware)([apiAuthMiddleware_1.ApiKeyAccess.SECRET]), (0, wrapController_1.default)(walletController_1.default.getWalletsByProjectId));
exports.default = walletRouter;
//# sourceMappingURL=walletRouter.js.map