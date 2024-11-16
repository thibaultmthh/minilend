"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areTxSponsoredAddressBodySchema = exports.createSponsoredAddressBodySchema = exports.deleteSponsoredAddressParamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.deleteSponsoredAddressParamSchema = joi_1.default.object({
    targetAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.createSponsoredAddressBodySchema = joi_1.default.object({
    targetAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.areTxSponsoredAddressBodySchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required(),
    transactions: joi_1.default.required()
});
//# sourceMappingURL=addressSchema.js.map