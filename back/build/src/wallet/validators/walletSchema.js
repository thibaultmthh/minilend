"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletsQuerySchema = exports.importBodyParamsSchema = exports.createWalletSchema = exports.walletIsValidSignatureBodyParamsSchema = exports.walletContractAsParamsSchema = exports.getWalletsParamSchema = exports.chainIdAsParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.chainIdAsParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required()
});
exports.getWalletsParamSchema = joi_1.default.object({
    projectId: joi_1.default.string().required()
});
exports.walletContractAsParamsSchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.walletIsValidSignatureBodyParamsSchema = joi_1.default.object({
    chainId: joi_1.default.number().required(),
    message: joi_1.default.required(),
    signature: joiHelpers_1.default.joiAsBytesLike()
});
exports.createWalletSchema = joi_1.default.object({
    chainId: joi_1.default.number().required(),
    initiatorAddress: joiHelpers_1.default.joiAsAddress().required(),
    walletAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.importBodyParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required(),
    walletAddress: joiHelpers_1.default.joiAsAddress(),
    signerAddress: joiHelpers_1.default.joiAsAddress(),
    publicKeyId: joi_1.default.string(),
    publicKeyX: joi_1.default.string(),
    publicKeyY: joi_1.default.string(),
    deviceData: joi_1.default.object()
});
exports.getWalletsQuerySchema = joi_1.default.object({
    limit: joi_1.default.number().integer().min(1).max(5000),
    offset: joi_1.default.number().integer().min(0)
});
//# sourceMappingURL=walletSchema.js.map