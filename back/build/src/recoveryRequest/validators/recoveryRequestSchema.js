"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSignerAsParamsSchema = exports.RecoveryRequestBodyParamsSchema = exports.walletContractAsParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.walletContractAsParamsSchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.RecoveryRequestBodyParamsSchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress(),
    signerAddress: joi_1.default.string().required(),
    deviceData: joi_1.default.object().required(),
    type: joi_1.default.required(),
    publicKeyX: joi_1.default.string().allow(null),
    publicKeyY: joi_1.default.string().allow(null),
    publicKeyId: joi_1.default.string().allow(null)
});
exports.deleteSignerAsParamsSchema = joi_1.default.object({
    signerAddress: joiHelpers_1.default.joiAsAddress().required()
});
//# sourceMappingURL=recoveryRequestSchema.js.map