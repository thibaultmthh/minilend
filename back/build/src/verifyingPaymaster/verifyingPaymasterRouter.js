"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthMiddleware_1 = __importDefault(require("../middleware/apiAuthMiddleware"));
const getValidateReqFieldMiddleware_1 = __importDefault(require("../middleware/getValidateReqFieldMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const verifyingPaymasterSchema_1 = require("./validators/verifyingPaymasterSchema");
const verifyingPaymasterController_1 = __importDefault(require("./verifyingPaymasterController"));
const verifyingPaymasterRouter = (0, express_1.Router)();
verifyingPaymasterRouter.use(apiAuthMiddleware_1.default);
verifyingPaymasterRouter.post('/validate', (0, getValidateReqFieldMiddleware_1.default)('body', verifyingPaymasterSchema_1.verifPaymasterValidateBodySchema), (0, wrapController_1.default)(verifyingPaymasterController_1.default.validateSponsoring));
exports.default = verifyingPaymasterRouter;
//# sourceMappingURL=verifyingPaymasterRouter.js.map