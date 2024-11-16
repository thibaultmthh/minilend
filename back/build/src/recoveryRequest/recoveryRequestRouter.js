"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthMiddleware_1 = __importDefault(require("../middleware/apiAuthMiddleware"));
const getValidateReqFieldMiddleware_1 = __importDefault(require("../middleware/getValidateReqFieldMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const recoveryRequestController_1 = __importDefault(require("./recoveryRequestController"));
const recoveryRequestSchema_1 = require("./validators/recoveryRequestSchema");
const signerRequestRouter = (0, express_1.Router)({ mergeParams: true });
signerRequestRouter.use(apiAuthMiddleware_1.default);
signerRequestRouter.get('/:walletAddress', (0, wrapController_1.default)(recoveryRequestController_1.default.getRecoveryRequestByWalletAddress));
signerRequestRouter.post('/', 
//accessAuthMiddleware([ApiKeyAccess.SECRET]),
(0, getValidateReqFieldMiddleware_1.default)('body', recoveryRequestSchema_1.RecoveryRequestBodyParamsSchema), (0, wrapController_1.default)(recoveryRequestController_1.default.createRecoveryRequest));
signerRequestRouter.delete('/:signerAddress', 
//accessAuthMiddleware([ApiKeyAccess.SECRET]),
(0, getValidateReqFieldMiddleware_1.default)('params', recoveryRequestSchema_1.deleteSignerAsParamsSchema), (0, wrapController_1.default)(recoveryRequestController_1.default.deleteRecoveryRequest));
exports.default = signerRequestRouter;
//# sourceMappingURL=recoveryRequestRouter.js.map