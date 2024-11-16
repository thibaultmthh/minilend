"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const logger_1 = __importDefault(require("../services/logger"));
function getValidateReqFieldMiddleware(fieldKey, schema) {
    return async (req, res, next) => {
        const response = schema.validate(req[fieldKey]);
        if (response.error) {
            logger_1.default.info('Request is not valid', response.error);
            return next((0, http_errors_1.BadRequest)(`Request is not valid: ${response.error}`));
        }
        next();
    };
}
exports.default = getValidateReqFieldMiddleware;
//# sourceMappingURL=getValidateReqFieldMiddleware.js.map