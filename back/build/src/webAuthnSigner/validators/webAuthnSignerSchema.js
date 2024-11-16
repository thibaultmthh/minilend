"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebAuthnSignerBodyParamsSchema = exports.predictWebAuthnSignerBodyParamsSchema = exports.chainAndWalletAsParamsSchema = exports.walletContractAsParamsSchema = exports.byPublicKeyIdAsBodySchema = exports.publicKeyIdAsParamsSchema = exports.chainIdAsParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.chainIdAsParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required()
});
exports.publicKeyIdAsParamsSchema = joi_1.default.object({
    publicKeyId: joi_1.default.string().required()
});
exports.byPublicKeyIdAsBodySchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required(),
    publicKeyId: joi_1.default.string().required()
});
exports.walletContractAsParamsSchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required()
});
exports.chainAndWalletAsParamsSchema = joi_1.default.object({
    walletAddress: joiHelpers_1.default.joiAsAddress().required(),
    chainId: joi_1.default.string().required()
});
exports.predictWebAuthnSignerBodyParamsSchema = joi_1.default.object({
    publicKeyX: joi_1.default.string().required(),
    publicKeyY: joi_1.default.string().required()
});
exports.createWebAuthnSignerBodyParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required(),
    walletAddress: joiHelpers_1.default.joiAsAddress().required(),
    publicKeyId: joi_1.default.string().required(),
    publicKeyX: joi_1.default.string().required(),
    publicKeyY: joi_1.default.string().required(),
    deviceData: joi_1.default.object().required(),
    signerAddress: joiHelpers_1.default.joiAsAddress().required(),
    isSharedWebAuthnSigner: joi_1.default.boolean().required()
});
//# sourceMappingURL=webAuthnSignerSchema.js.map