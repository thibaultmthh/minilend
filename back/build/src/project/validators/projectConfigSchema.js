"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDomainsBodyParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joiHelpers_1 = __importDefault(require("../../utils/joiHelpers"));
exports.updateDomainsBodyParamsSchema = joi_1.default.object({
    domains: joi_1.default.array().items(joiHelpers_1.default.joiAsValidDomain())
});
//# sourceMappingURL=projectConfigSchema.js.map