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
exports.getCollection = exports.dropDatabase = exports.closeConnection = exports.connectToDatabase = void 0;
const mongoDB = __importStar(require("mongodb"));
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const logger_1 = __importDefault(require("../services/logger"));
let mongoDatabase;
let client;
async function connectToDatabase(mongoUrl, databaseSuffix = '') {
    client = new mongoDB.MongoClient(mongoUrl);
    await client.connect();
    mongoDatabase = client.db(globalConfig_1.default.mongoDbName + databaseSuffix);
    logger_1.default.info(`Successfully connected to database: ${mongoDatabase.databaseName}`);
}
exports.connectToDatabase = connectToDatabase;
const closeConnection = async () => {
    await client.close();
};
exports.closeConnection = closeConnection;
const dropDatabase = async () => {
    await mongoDatabase.dropDatabase();
};
exports.dropDatabase = dropDatabase;
const getCollection = (collectionName) => {
    return mongoDatabase.collection(collectionName);
};
exports.getCollection = getCollection;
exports.default = {
    connectToDatabase,
    closeConnection: exports.closeConnection,
    dropDatabase: exports.dropDatabase,
    getCollection: exports.getCollection
};
//# sourceMappingURL=mongoService.js.map