"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const api_1 = __importDefault(require("./api"));
const globalConfig_1 = __importDefault(require("./config/globalConfig"));
const logger_1 = __importDefault(require("./services/logger"));
const mongoService_1 = __importDefault(require("./services/mongoService"));
const startApiListening = async () => {
    await mongoService_1.default.connectToDatabase(globalConfig_1.default.mongoUrl);
    const expressApp = api_1.default.getApi();
    const apiPort = process.env.API_PORT || 3000;
    const httpServer = expressApp.listen(apiPort, () => {
        logger_1.default.info(`Connect API started on port ${apiPort}`);
    });
    httpServer.on('error', (error) => {
        logger_1.default.error('Http server error', error);
        throw error;
    });
};
startApiListening();
//# sourceMappingURL=app.js.map