"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const http_errors_1 = require("http-errors");
const joi_1 = __importDefault(require("joi"));
const joiAsAddress = () => {
    return joi_1.default.string().custom((walletAddress) => {
        if (!ethers_1.ethers.utils.isAddress(walletAddress)) {
            throw (0, http_errors_1.BadRequest)('Invalid user address');
        }
        else {
            return true;
        }
    });
};
const joiAsBytesLike = () => {
    return joi_1.default.string()
        .custom((param) => {
        return ethers_1.ethers.utils.isBytesLike(param);
    })
        .required();
};
exports.default = {
    joiAsAddress,
    joiAsBytesLike
};
//# sourceMappingURL=joiHelpers.js.map