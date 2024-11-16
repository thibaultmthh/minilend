"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifPaymasterValidateBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.verifPaymasterValidateBodySchema = joi_1.default.object().keys({
    userOperation: joi_1.default.object().keys({
        sender: joiHelpers_1.default.joiAsAddress().required(),
        nonce: joiHelpers_1.default.joiAsBigNumber(),
        factory: joi_1.default.string(),
        factoryData: joi_1.default.string(),
        initCode: joi_1.default.string(),
        callData: joi_1.default.string().required(),
        callGasLimit: joiHelpers_1.default.joiAsBigNumber(),
        verificationGasLimit: joiHelpers_1.default.joiAsBigNumber(),
        preVerificationGas: joiHelpers_1.default.joiAsBigNumber(),
        maxFeePerGas: joiHelpers_1.default.joiAsBigNumber(),
        maxPriorityFeePerGas: joiHelpers_1.default.joiAsBigNumber(),
        paymasterAndData: joi_1.default.string(),
        signature: joi_1.default.string().required()
    }),
    entryPoint: joiHelpers_1.default.joiAsAddress()
});
//# sourceMappingURL=verifyingPaymasterSchema.js.map