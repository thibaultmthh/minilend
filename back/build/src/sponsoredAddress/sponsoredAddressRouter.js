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
const sponsoredAddressController_1 = __importDefault(require("./sponsoredAddressController"));
const addressSchema_1 = require("./validators/addressSchema");
const sponsoredAddressRouter = (0, express_1.Router)();
sponsoredAddressRouter.use(apiAuthMiddleware_1.default);
sponsoredAddressRouter.get('/', (0, wrapController_1.default)(sponsoredAddressController_1.default.getProjectSponsoredAddresses));
sponsoredAddressRouter.post('/', (0, getValidateReqFieldMiddleware_1.default)('body', addressSchema_1.createSponsoredAddressBodySchema), (0, apiAuthMiddleware_1.accessAuthMiddleware)([apiAuthMiddleware_1.ApiKeyAccess.SECRET]), (0, wrapController_1.default)(sponsoredAddressController_1.default.createSponsoredAddress));
sponsoredAddressRouter.delete('/:targetAddress', (0, getValidateReqFieldMiddleware_1.default)('params', addressSchema_1.deleteSponsoredAddressParamSchema), (0, apiAuthMiddleware_1.accessAuthMiddleware)([apiAuthMiddleware_1.ApiKeyAccess.SECRET]), (0, wrapController_1.default)(sponsoredAddressController_1.default.deleteSponsoredAddress));
sponsoredAddressRouter.post('/is-sponsored', (0, getValidateReqFieldMiddleware_1.default)('body', addressSchema_1.areTxSponsoredAddressBodySchema), (0, wrapController_1.default)(sponsoredAddressController_1.default.areTxSponsored));
exports.default = sponsoredAddressRouter;
//# sourceMappingURL=sponsoredAddressRouter.js.map