"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiAuthMiddleware_1 = __importDefault(require("../middleware/apiAuthMiddleware"));
const getValidateReqFieldMiddleware_1 = __importDefault(require("../middleware/getValidateReqFieldMiddleware"));
const wrapController_1 = __importDefault(require("../middleware/wrapController"));
const projectController_1 = __importDefault(require("./projectController"));
const projectSchema_1 = require("./validators/projectSchema");
const projectRouter = (0, express_1.Router)();
projectRouter.use(apiAuthMiddleware_1.default);
projectRouter.get('/params', (0, getValidateReqFieldMiddleware_1.default)('query', projectSchema_1.chainIdAsParamsSchema), (0, wrapController_1.default)(projectController_1.default.getProjectParams));
exports.default = projectRouter;
//# sourceMappingURL=projectRouter.js.map