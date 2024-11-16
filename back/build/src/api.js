"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const router_1 = __importDefault(require("./router"));
const getApi = () => {
    const api = (0, express_1.default)();
    api.use(router_1.default);
    api.use(errorHandler_1.default);
    return api;
};
exports.default = {
    getApi
};
//# sourceMappingURL=api.js.map