"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const redoc_express_1 = __importDefault(require("redoc-express"));
const projectRouter_1 = __importDefault(require("./project/projectRouter"));
const socialRecoveryRouter_1 = __importDefault(require("./socialRecovery/socialRecoveryRouter"));
const walletRouter_1 = __importDefault(require("./wallet/walletRouter"));
const webAuthnSignerRouter_1 = __importDefault(require("./webAuthnSigner/webAuthnSignerRouter"));
const router = (0, express_1.Router)();
const OPEN_API_FILE_NAME = 'api.yml';
const OPEN_API_FILE_PATH = `./dist/${OPEN_API_FILE_NAME}`;
router.use(body_parser_1.default.json());
router.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
router.get(`/doc/${OPEN_API_FILE_NAME}`, (req, res) => {
    res.sendFile(OPEN_API_FILE_PATH, { root: '.' });
});
router.get('/doc', (0, redoc_express_1.default)({
    title: 'API Docs',
    specUrl: `/doc/${OPEN_API_FILE_NAME}`,
    nonce: '',
    redocOptions: {
        theme: {
            codeBlock: {
                borderRadius: '8'
            },
            typography: {
                fontSize: '16px',
                fontFamily: 'Roboto Mono, Roboto, sans-serif',
                optimizeSpeed: true,
                smoothing: 'antialiased',
                headings: {
                    fontWeight: 'bold',
                    lineHeight: '2em'
                },
                code: {
                    fontWeight: '600',
                    color: 'rgba(92, 62, 189, 1)',
                    wrap: true
                },
                links: {
                    color: 'rgba(246, 20, 63, 1)',
                    visited: 'rgba(246, 20, 63, 1)',
                    hover: '#fa768f'
                }
            },
            sidebar: {
                width: '300px',
                textColor: '#000000',
                backgroundColor: '#ffffff'
            },
            rightPanel: {
                backgroundColor: 'rgba(55, 53, 71, 1)',
                textColor: '#ffffff'
            }
        },
        colors: {
            primary: {
                main: 'rgba(246, 20, 63, 1)',
                light: 'rgba(246, 20, 63, 0.42)'
            },
            success: {
                main: 'rgba(28, 184, 65, 1)',
                light: '#81ec9a',
                dark: '#083312',
                contrastText: '#000'
            },
            text: {
                primary: 'rgba(0, 0, 0, 1)',
                secondary: '#4d4d4d'
            },
            http: {
                get: 'rgba(0, 200, 219, 1)',
                post: 'rgba(28, 184, 65, 1)',
                put: 'rgba(255, 187, 0, 1)',
                delete: 'rgba(254, 39, 35, 1)'
            }
        }
    }
}));
router.use('/project', projectRouter_1.default);
router.use('/wallet', walletRouter_1.default);
router.use('/recovery', socialRecoveryRouter_1.default);
router.use('/webauthn-signer', webAuthnSignerRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map