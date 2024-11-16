"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainIdAsParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.chainIdAsParamsSchema = joi_1.default.object({
    chainId: joi_1.default.string().required()
});
//# sourceMappingURL=projectSchema.js.map