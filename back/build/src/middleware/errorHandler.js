"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const logger_1 = __importDefault(require("../services/logger"));
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const payload = {
        projectId: req.projectId,
        apikey: req.headers.apikey
    };
    if (err instanceof http_errors_1.BadRequest) {
        logger_1.default.info('Bad Request', err, payload);
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof http_errors_1.Forbidden) {
        logger_1.default.info('Forbidden', err, payload);
        res.status(403).json({ error: err.message });
    }
    else if (err instanceof http_errors_1.Unauthorized) {
        logger_1.default.info('Unauthorized', err, payload);
        res.status(401).json({ error: err.message });
    }
    else if (err instanceof http_errors_1.NotFound) {
        logger_1.default.info('Not found', err, payload);
        res.status(404).json({ error: err.message });
    }
    else {
        logger_1.default.error(err.message, err, payload);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map