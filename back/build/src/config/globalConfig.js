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
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const webAuthnSignerTypes_1 = require("../webAuthnSigner/webAuthnSignerTypes");
const sharedRecoveryConfig = {
    // addresses at https://github.com/gnosis/zodiac/blob/master/sdk/contracts.ts
    moduleFactoryAddress: process.env.MODULE_FACTORY_ADDRESS ||
        '0x000000000000aDdB49795b0f9bA5BC298cDda236',
    delayModuleAddress: process.env.DELAY_MODULE_ADDRESS ||
        '0xd54895B1121A2eE3f37b502F507631FA1331BED6',
    recoveryCooldown: parseInt(process.env.RECOVERY_COOLDOWN || '86400', 10),
    recoveryExpiration: parseInt(process.env.RECOVERY_EXPIRATION || '604800', 10)
};
const globalConfig = {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
    mongoDbName: process.env.MONGO_DB_NAME || 'your-db-name',
    logLevel: (process.env.LOG_LEVEL || 'debug'),
    networks: {
        421614: {
            RPCUrl: process.env.RPC_ARBITRUM_SEPOLIA ||
                'https://arbitrum-sepolia.core.chainstack.com/afd23bf514983ff50beb05b72a3f70da',
            networkName: 'Arbitrum Sepolia',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            safe4337SessionKeysModule: '0x28b69F47782ce14936d31461A6378D011460415a',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_ARBITRUM_SEPOLIA || '',
            safeServiceUrl: '',
            comethRelayUrl: 'http://relayer-arbitrum-sepolia-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        137: {
            RPCUrl: process.env.RPC_URL_POLYGON ||
                'https://polygon-mainnet.infura.io/v3/66ef75d39b1445d6866ac160fe3ea397',
            networkName: 'Polygon',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_POLYGON || '',
            safeServiceUrl: 'https://safe-transaction-polygon.safe.global',
            comethRelayUrl: process.env.COMETH_RELAY_URL_POLYGON || 'http://relayer-polygon-api/',
            globalSponsoredAddresses: [
                '0x84add3fa2c2463c8cf2c95ad70e4b5f602332160',
                '0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F'
            ]
        },
        4078: {
            RPCUrl: process.env.RPC_URL_MUSTER || 'https://muster.alt.technology/',
            networkName: 'Muster',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_MUSTER || '',
            safeServiceUrl: '',
            comethRelayUrl: process.env.COMETH_RELAY_URL_MUSTER || 'http://relayer-muster-api/',
            globalSponsoredAddresses: [
                '0x4311eafbf37727cf1b6d56dcea570d6872f0dfc3',
                '0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F'
            ]
        },
        11155420: {
            RPCUrl: process.env.RPC_URL_OPTIMISM_SEPOLIA ||
                'https://opt-sepolia.g.alchemy.com/v2/R1QMS90WEPUSzkRBH5CqwOJTiMB_d_fZ',
            networkName: 'Optimism Sepolioa',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_OPTIMISM_SEPOLIA || '',
            safeServiceUrl: '',
            comethRelayUrl: process.env.COMETH_RELAY_URL_OPTIMISM_SEPOLIA ||
                'http://relayer-optimism-sepolia-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        84532: {
            RPCUrl: process.env.RPC_BASE_SEPOLIA ||
                'https://base-sepolia.g.alchemy.com/v2/lRidMD7iHYCbuNdbOb2_YrTU1anBHhHB',
            networkName: 'Base Sepolia',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            safe4337SessionKeysModule: '0x28b69F47782ce14936d31461A6378D011460415a',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_BASE_SEPOLIA || '',
            safeServiceUrl: '',
            comethRelayUrl: 'http://relayer-base-sepolia-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        42161: {
            RPCUrl: process.env.RPC_ARBITRUM ||
                'https://arbitrum-mainnet.infura.io/v3/2e1346349a5d4a24aeba9dee6c7b20b5',
            networkName: 'Arbitrum',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_ARBITRUM || '',
            safeServiceUrl: 'https://safe-transaction-arbitrum.safe.global',
            comethRelayUrl: 'http://relayer-arbitrum-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        8453: {
            RPCUrl: process.env.RPC_BASE ||
                'https://base-mainnet.g.alchemy.com/v2/6x1JWyeip3y0ClH9YNndirDG4MhiJHOK',
            networkName: 'Base',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_BASE || '',
            safeServiceUrl: 'https://safe-transaction-base.safe.global',
            comethRelayUrl: 'http://relayer-base-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        10: {
            RPCUrl: process.env.RPC_OPTIMISM ||
                'https://optimism-mainnet.infura.io/v3/2e1346349a5d4a24aeba9dee6c7b20b5',
            networkName: 'Optimism',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_OPTIMISM || '',
            safeServiceUrl: 'https://safe-transaction-optimism.safe.global',
            comethRelayUrl: 'http://relayer-optimism-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        80002: {
            RPCUrl: process.env.RPC_AMOY ||
                'https://polygon-amoy.infura.io/v3/2e1346349a5d4a24aeba9dee6c7b20b5',
            networkName: 'Amoy',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_AMOY || '',
            safeServiceUrl: '',
            comethRelayUrl: 'http://relayer-amoy-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        100: {
            RPCUrl: process.env.RPC_GNOSIS || 'https://gnosis.drpc.org',
            networkName: 'Gnosis chain',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            migrationContractAddress: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_GNOSIS || '',
            safeServiceUrl: 'https://safe-transaction-gnosis-chain.safe.global',
            comethRelayUrl: 'http://relayer-gnosis-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        },
        80084: {
            RPCUrl: process.env.RPC_BERACHAIN_BARTIO || 'https://bartio.rpc.berachain.com',
            networkName: 'Berachain BArtio',
            safeWebAuthnSharedSignerAddress: '0xfD90FAd33ee8b58f32c00aceEad1358e4AFC23f9',
            safe4337ModuleAddress: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
            safeModuleSetUpAddress: '0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47',
            safeP256VerifierAddress: '0x445a0683e494ea0c5AF3E83c5159fBE47Cf9e765',
            safeWebAuthnSignerFactory: '0xF7488fFbe67327ac9f37D5F722d83Fc900852Fbf',
            safeWebAuthnSignerSingleton: '0x270D7E4a57E6322f336261f3EaE2BADe72E68d72',
            safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            safeSingletonAddress: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
            multisendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
            multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
            ...sharedRecoveryConfig,
            guardianAddress: process.env.DEFAULT_GUARDIAN_BERACHAIN_BARTIO || '',
            safeServiceUrl: '',
            comethRelayUrl: 'http://relayer-bartio-api/',
            globalSponsoredAddresses: ['0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F']
        }
    },
    gcpKmsProjectId: process.env.GCP_KMS_PROJECT_ID || '',
    gcpKmsLocationId: process.env.GCP_KMS_LOCATION_ID || 'global',
    gcpKmsKeyRingId: process.env.GCP_KMS_KEY_RING_ID || '',
    gcpKmsKeyId: process.env.GCP_KMS_KEY_ID || '',
    gcpKmsVersionId: process.env.GCP_KMS_VERSION_ID || '1',
    safeWebAuthnSignerProxyCreationCode: '0x61010060405234801561001157600080fd5b506040516101ee3803806101ee83398101604081905261003091610058565b6001600160a01b0390931660805260a09190915260c0526001600160b01b031660e0526100bc565b6000806000806080858703121561006e57600080fd5b84516001600160a01b038116811461008557600080fd5b60208601516040870151606088015192965090945092506001600160b01b03811681146100b157600080fd5b939692955090935050565b60805160a05160c05160e05160ff6100ef60003960006008015260006031015260006059015260006080015260ff6000f3fe608060408190527f00000000000000000000000000000000000000000000000000000000000000003660b681018290527f000000000000000000000000000000000000000000000000000000000000000060a082018190527f00000000000000000000000000000000000000000000000000000000000000008285018190527f00000000000000000000000000000000000000000000000000000000000000009490939192600082376000806056360183885af490503d6000803e8060c3573d6000fd5b503d6000f3fea2646970667358221220ddd9bb059ba7a6497d560ca97aadf4dbf0476f578378554a50d41c6bb654beae64736f6c63430008180033',
    currentWebauthnVersion: process.env.CURRENT_WEBAUTHN_VERSION ||
        webAuthnSignerTypes_1.WebauthnVersion.V1
};
exports.default = globalConfig;
//# sourceMappingURL=globalConfig.js.map