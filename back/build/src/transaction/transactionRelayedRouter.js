"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthMiddleware_1 = __importDefault(require("../middleware/apiAuthMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const transactionController_1 = __importDefault(require("../transaction/transactionController"));
const router = (0, express_1.Router)();
router.use(apiAuthMiddleware_1.default);
router.get('/:relayId', (0, wrapController_1.default)(transactionController_1.default.getRelayedTransaction));
exports.default = router;
//# sourceMappingURL=transactionRelayedRouter.js.map