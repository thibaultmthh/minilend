"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletDeploymentParams = exports.webAuthnDeploymentParams = exports.getFunctionMock = void 0;
const globalConfig_1 = __importDefault(require("../../src/config/globalConfig"));
const walletTypes_1 = require("../../src/wallet/walletTypes");
const getFunctionMock = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
targetFunction) => {
    return targetFunction;
};
exports.getFunctionMock = getFunctionMock;
exports.webAuthnDeploymentParams = {
    version: globalConfig_1.default.currentWebauthnVersion,
    safeWebAuthnSharedSignerAddress: '',
    safeWebAuthnSignerFactory: '',
    safeWebAuthnSignerSingleton: '',
    verifier: ''
};
exports.walletDeploymentParams = {
    version: walletTypes_1.WalletVersion.V1,
    safeContractParams: {
        safeProxyFactoryAddress: globalConfig_1.default.networks[137].safeProxyFactoryAddress,
        safeSingletonAddress: globalConfig_1.default.networks[137].safeSingletonAddress,
        fallbackHandler: globalConfig_1.default.networks[137].safe4337ModuleAddress,
        multisendAddress: globalConfig_1.default.networks[137].multisendAddress,
        setUpContractAddress: globalConfig_1.default.networks[137].safeModuleSetUpAddress,
        safeWebAuthnSharedSignerContractAddress: globalConfig_1.default.networks[137].safeWebAuthnSharedSignerAddress,
        p256Verifier: globalConfig_1.default.networks[137].safeP256VerifierAddress,
        safe4337SessionKeysModule: globalConfig_1.default.networks[137]
            .safe4337SessionKeysModule
    },
    recoveryParams: {
        moduleFactoryAddress: globalConfig_1.default.networks[137].moduleFactoryAddress,
        delayModuleAddress: globalConfig_1.default.networks[137].delayModuleAddress,
        recoveryCooldown: globalConfig_1.default.networks[137].recoveryCooldown,
        recoveryExpiration: globalConfig_1.default.networks[137].recoveryExpiration
    }
};
//# sourceMappingURL=testUtils.js.map