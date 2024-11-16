"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeRecoveryBodyParamsSchema = exports.startRecoveryBodyParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.startRecoveryBodyParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required(),
    walletAddress: joiHelpers_1.default.joiAsAddress().required(),
    newOwner: joiHelpers_1.default.joiAsAddress().required(),
    newThreshold: joi_1.default.number().min(1),
    deviceData: joi_1.default.object(),
    publicKeyId: joi_1.default.string().allow(null),
    publicKeyX: joi_1.default.string().allow(null),
    publicKeyY: joi_1.default.string().allow(null)
});
exports.finalizeRecoveryBodyParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required(),
    walletAddress: joiHelpers_1.default.joiAsAddress().required()
});
//# sourceMappingURL=socialRecoverySchema.js.map