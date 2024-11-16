"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tslog_1 = require("tslog");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
let type;
let minLevel;
let dateTimePattern;
let prefix;
let printLogMessageInNewLine;
let overwriteConsole;
let shouldStringifyError = true;
switch (process.env.NODE_ENV) {
    case 'local':
        type = 'pretty';
        minLevel = globalConfig_1.default.logLevel;
        dateTimePattern = 'hour:minute:second';
        prefix = ['        ']; // prettier
        printLogMessageInNewLine = true;
        overwriteConsole = false;
        shouldStringifyError = false;
        break;
    case 'test':
        type = 'pretty';
        minLevel = 'error';
        dateTimePattern = 'hour:minute:second';
        prefix = [];
        printLogMessageInNewLine = true;
        overwriteConsole = false; // keep logger.info for developer in test environment
        break;
    default: // production environment
        type = 'json';
        minLevel = globalConfig_1.default.logLevel;
        dateTimePattern = 'day-month-year hour:minute:second.millisecond';
        prefix = [];
        printLogMessageInNewLine = false;
        overwriteConsole = true;
        break;
}
class CustomLogger extends tslog_1.Logger {
    constructor(settings, parentSettings) {
        super(settings, parentSettings);
    }
    error(errorTitle, err, ...payload) {
        let errorToLog = '';
        if (err && err.stack) {
            errorToLog = shouldStringifyError ? err.stack : err;
        }
        return super.error(errorTitle, errorToLog, ...payload);
    }
    warn(title, err, ...payload) {
        if (!err) {
            return super.warn(title, ...payload);
        }
        return super.warn(title, err, ...payload);
    }
    info(title, ...payload) {
        return super.info(title, ...payload);
    }
    getChildLogger(settings) {
        return super.getChildLogger(settings);
    }
}
const logger = new CustomLogger({
    instanceName: 'EngineTargetLogger',
    type,
    minLevel,
    dateTimePattern,
    overwriteConsole,
    setCallerAsLoggerName: true,
    dateTimeTimezone: 'Europe/Paris',
    displayInstanceName: false,
    displayLoggerName: false,
    displayFunctionName: false,
    printLogMessageInNewLine,
    prefix,
    prettyInspectHighlightStyles: {
        special: 'cyan',
        number: 'white',
        bigint: 'yellow',
        boolean: 'yellow',
        undefined: 'grey',
        null: 'bold',
        string: 'green',
        symbol: 'green',
        date: 'magenta',
        regexp: 'red',
        module: 'underline'
    },
    logLevelsColors: {
        0: 'grey',
        1: 'magenta',
        2: 'cyan',
        3: 'green',
        4: 'yellow',
        5: 'redBright',
        6: 'bgRedBright'
    }
});
exports.default = logger;
//# sourceMappingURL=logger.js.map