"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessAuthMiddleware = exports.ApiKeyAccess = void 0;
const http_errors_1 = require("http-errors");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const logger_1 = __importDefault(require("../services/logger"));
var ApiKeyAccess;
(function (ApiKeyAccess) {
    ApiKeyAccess["PUBLIC"] = "public";
    ApiKeyAccess["SECRET"] = "secret";
    ApiKeyAccess["ADMIN"] = "admin";
})(ApiKeyAccess || (exports.ApiKeyAccess = ApiKeyAccess = {}));
const _authenticateConsumer = (headers) => {
    const projectId = headers['x-consumer-username'];
    const scopes = headers['x-consumer-groups'];
    const access = headers['x-consumer-access'];
    const chainId = headers['x-project-chain-id'];
    if (!projectId || !scopes || !access || !chainId) {
        throw (0, http_errors_1.Forbidden)('Request not authenticated, requires a valid apikey');
    }
    if (typeof projectId !== 'string' ||
        typeof access !== 'string' ||
        !(typeof scopes === 'string' || Array.isArray(scopes)) ||
        typeof chainId !== 'string') {
        throw (0, http_errors_1.Forbidden)('Invalid authenticated headers');
    }
    const providedChainId = Number(chainId);
    if (access != ApiKeyAccess.ADMIN &&
        globalConfig_1.default.networks[providedChainId] == undefined) {
        throw (0, http_errors_1.Forbidden)('Network not supported');
    }
    return {
        projectId: projectId,
        scopes: scopes,
        access: access,
        chainId: providedChainId
    };
};
const apiAuthMiddleware = (req, res, next) => {
    try {
        const consumer = _authenticateConsumer(req.headers);
        req.access = consumer.access;
        req.projectId = consumer.projectId;
        req.chainId = consumer.chainId;
        return next();
    }
    catch (error) {
        logger_1.default.info('Unauthorized route', error, {
            apikey: req.headers.apikey,
            apisecret: req.headers.apisecret
        });
        return next(error);
    }
};
const accessAuthMiddleware = (allowed) => {
    return (req, res, next) => {
        if (!req.access) {
            return next((0, http_errors_1.Forbidden)('Request not authenticated, requires a valid apikey'));
        }
        if (!allowed.includes(req.access)) {
            return next((0, http_errors_1.Forbidden)("ApiKey doesn't have the required access level"));
        }
        return next();
    };
};
exports.accessAuthMiddleware = accessAuthMiddleware;
exports.default = apiAuthMiddleware;
//# sourceMappingURL=apiAuthMiddleware.js.map