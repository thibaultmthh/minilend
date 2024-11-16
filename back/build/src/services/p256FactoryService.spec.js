"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const P256_SIGNER_BYTECODE = '0x00';
const P256_ADDRESS_FACTORY = '0x0C3a517aCE13BBCA055F8FFc5f97A1CFe732C381';
const P256_SIGNER_ADDRESS = '0x0C3a517aCE13BBCA055F8FFc5f97A1CFe732C381';
const currentWebauthnVersion = 'v2.0';
jest.doMock('@/config/globalConfig', () => ({
    networks: {
        // Default network: Polygon
        137: {
            P256SignerCreationCode: P256_SIGNER_BYTECODE,
            P256FactoryContract: P256_ADDRESS_FACTORY,
            P256SignerContractAddress: P256_SIGNER_ADDRESS
        }
    },
    currentWebauthnVersion: currentWebauthnVersion
}));
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const webAuthnSignerTypes_1 = require("../webAuthnSigner/webAuthnSignerTypes");
const testUtils_1 = require("../../tests/unit/testUtils");
const p256FactoryService_1 = __importDefault(require("./p256FactoryService"));
const DEPLOYED_WEBAUTHN_SIGNER_ADDRESS_V2 = '0x69eC12f2dDe8B553e4961b22ae29a173D28a921D';
const publicKeyX = '0xaf0b3c3d191a70a11e2b0b0bc6216f3b960ad20dc0bb34920348fe7852e68d7a';
const publicKeyY = '0x40ed49be1573e8a5096adfefc36dfbdff42f1be69eed8b5355a08755ba7c17bc';
describe('p256FactoryService', () => {
    describe('predictSafeAddress', () => {
        it('Given an x and y, when predicting a deployed signer address with webauthnSigner v2, then return the correct address', async () => {
            const predictedAddress = await p256FactoryService_1.default.predictSignerAddress(publicKeyX, publicKeyY, testUtils_1.webAuthnDeploymentParams);
            expect(predictedAddress).toEqual(DEPLOYED_WEBAUTHN_SIGNER_ADDRESS_V2);
        });
        it('Given an x and y, when predicting signer address without P256 implementation address, then throw error', async () => {
            const webAuthnDeploymentParamsV2 = {
                version: webAuthnSignerTypes_1.WebauthnVersion.V2,
                P256FactoryContract: globalConfig_1.default.networks[137].P256FactoryContract
            };
            await expect(p256FactoryService_1.default.predictSignerAddress(publicKeyX, publicKeyY, webAuthnDeploymentParamsV2)).rejects.toThrow(Error('P256 implementation not in signer object'));
        });
    });
});
//# sourceMappingURL=p256FactoryService.spec.js.map