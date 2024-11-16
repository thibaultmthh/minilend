"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const safeService_1 = __importDefault(require("../services/safeService"));
const EOA_ADDRESS = '0x4B758d3Af4c8B2662bC485420077413DDdd62E33';
const DEPLOYED_SAFE_ADDRESS = '0xF35C1a40B308E6EC424E092e8724A2530fe4677D';
const CHAIN_ID = 137;
const saltNonce = ethers_1.ethers.utils.formatBytes32String('test');
const PROXY_FACTORY_ADDRESS = '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2';
const SAFE_SINGLETON_ADDRESS = '0x3E5c63644E683549055b9Be8653de26E0B4CD36E';
describe('SafeService', () => {
    describe('predictSafeAddress', () => {
        const safeAccountConfig = {
            owners: [EOA_ADDRESS],
            threshold: 1,
            to: ethers_1.ethers.constants.AddressZero,
            data: '0x',
            fallbackHandler: ethers_1.ethers.constants.AddressZero,
            paymentToken: ethers_1.ethers.constants.AddressZero,
            payment: 0,
            paymentReceiver: ethers_1.ethers.constants.AddressZero
        };
        it('Given a setup config, when predicting a deployed safe address, then return the correct address', async () => {
            const encodedSetUpData = await safeService_1.default.setUpEncodeFunctionData(safeAccountConfig);
            const predictedAddress = await safeService_1.default.predictSafeAddress(encodedSetUpData, saltNonce, CHAIN_ID, PROXY_FACTORY_ADDRESS, SAFE_SINGLETON_ADDRESS);
            expect(predictedAddress).toEqual(DEPLOYED_SAFE_ADDRESS);
        });
    });
});
//# sourceMappingURL=safeService.spec.js.map