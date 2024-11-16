"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const getProjectParams = async (req, res) => {
    const chainId = Number(req.query.chainId);
    const projectParams = {
        chainId: chainId,
        safeContractParams: {
            safeProxyFactoryAddress: globalConfig_1.default.networks[chainId].safeProxyFactoryAddress,
            safeSingletonAddress: globalConfig_1.default.networks[chainId].safeSingletonAddress,
            fallbackHandler: globalConfig_1.default.networks[chainId].safe4337ModuleAddress,
            multisendAddress: globalConfig_1.default.networks[chainId].multisendAddress,
            setUpContractAddress: globalConfig_1.default.networks[chainId].safeModuleSetUpAddress,
            safeWebAuthnSharedSignerContractAddress: globalConfig_1.default.networks[chainId].safeWebAuthnSharedSignerAddress,
            safeWebAuthnSignerFactory: globalConfig_1.default.networks[chainId].safeWebAuthnSignerFactory,
            p256Verifier: globalConfig_1.default.networks[chainId].safeP256VerifierAddress,
            safe4337ModuleAddress: globalConfig_1.default.networks[chainId].safe4337ModuleAddress,
            safe4337SessionKeysModule: globalConfig_1.default.networks[chainId].safe4337SessionKeysModule,
            migrationContractAddress: globalConfig_1.default.networks[chainId].migrationContractAddress
        },
        recoveryParams: {
            moduleFactoryAddress: globalConfig_1.default.networks[chainId].moduleFactoryAddress,
            delayModuleAddress: globalConfig_1.default.networks[chainId].delayModuleAddress,
            recoveryCooldown: globalConfig_1.default.networks[chainId].recoveryCooldown,
            recoveryExpiration: globalConfig_1.default.networks[chainId].recoveryExpiration,
            guardianAddress: globalConfig_1.default.networks[chainId].guardianAddress
        }
    };
    res.status(200).json({ success: true, projectParams });
};
exports.default = {
    getProjectParams
};
//# sourceMappingURL=projectController.js.map