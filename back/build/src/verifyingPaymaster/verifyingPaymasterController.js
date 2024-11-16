"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyingPaymasterService_1 = __importDefault(require("./verifyingPaymasterService"));
const validateSponsoring = async (req, res) => {
    const { chainId } = req;
    const { userOperation, entrypoint } = req.body;
    const result = await verifyingPaymasterService_1.default.validateUserOpsSponsoring(chainId, userOperation);
    res.status(200).json({
        result
    });
};
exports.default = {
    validateSponsoring
};
//# sourceMappingURL=verifyingPaymasterController.js.map