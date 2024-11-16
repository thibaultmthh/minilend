"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalSponsoredContract = '0x533d23Cd30BAEdF1F2ea599b7e1D087575a236FF';
const CHAIN_ID = 137;
const LIMIT = 20;
const OFFSET = 0;
jest.doMock('@/config/globalConfig', () => ({
    networks: {
        [CHAIN_ID]: {
            globalSponsoredAddresses: [globalSponsoredContract],
            moduleFactoryAddress: '0x_delayModuleFactoryAddress'
        }
    }
}));
const testUtils_1 = require("../../tests/unit/testUtils");
const blockchainService_1 = __importDefault(require("../services/blockchainService"));
const safeService_1 = __importDefault(require("../services/safeService"));
const sponsoredAddressRepository_1 = __importDefault(require("./sponsoredAddressRepository"));
const sponsoredAddressService_1 = __importDefault(require("./sponsoredAddressService"));
const sponsoredAddressTypes_1 = require("./sponsoredAddressTypes");
jest.mock('./sponsoredAddressRepository', () => ({
    insertSponsoredAddress: jest.fn(),
    getSponsoredAddressesByProjectId: jest.fn(),
    getSponsoredAddress: jest.fn(),
    deleteSponsoredAddress: jest.fn()
}));
jest.mock('@/services/blockchainService', () => ({
    getProvider: jest.fn()
}));
jest.mock('@/services/safeService', () => ({
    isModuleEnabled: jest.fn()
}));
describe('sponsoredAddressService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createSponsoredAddress', () => {
        const _setResolvedInsertSponsoredAddress = () => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressRepository_1.default.insertSponsoredAddress).mockResolvedValue({});
        };
        const targetAddress = '0x1';
        const projectId = 'id_1';
        beforeEach(() => {
            _setResolvedInsertSponsoredAddress();
        });
        it(`Given a targetAddress and projectId, when creating the sponsored Addresses, then send right params to repository`, async () => {
            await sponsoredAddressService_1.default.createSponsoredAddress(projectId, targetAddress, CHAIN_ID);
            expect(sponsoredAddressRepository_1.default.insertSponsoredAddress).toHaveBeenCalledWith(projectId, targetAddress, CHAIN_ID);
        });
    });
    describe('getProjectSponsoredAddresses', () => {
        const targetAddresses = [
            { chainId: 137, targetAddress: '0x1', isGlobal: false },
            { chainId: 137, targetAddress: '0x2', isGlobal: false }
        ];
        const projectId = 'id_1';
        const _setResolvedGetAllSponsoredAddress = () => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressRepository_1.default.getSponsoredAddressesByProjectId).mockResolvedValue(targetAddresses);
        };
        beforeEach(() => {
            _setResolvedGetAllSponsoredAddress();
        });
        it(`Given a projectId, when getting the sponsored Addresses, then send right params to repository`, async () => {
            await sponsoredAddressService_1.default.getProjectSponsoredAddresses({
                projectId,
                chainId: CHAIN_ID,
                limit: LIMIT,
                offset: OFFSET
            });
            expect(sponsoredAddressRepository_1.default.getSponsoredAddressesByProjectId).toHaveBeenCalledWith(projectId, CHAIN_ID, LIMIT, OFFSET);
        });
        it(`Given a projectId, when getting the sponsored Addresses, then return the sponsoredAddresses`, async () => {
            const allSponsoredAddressesForProject = await sponsoredAddressService_1.default.getProjectSponsoredAddresses({
                projectId,
                chainId: CHAIN_ID,
                limit: 1000,
                offset: 0
            });
            expect(allSponsoredAddressesForProject).toEqual(targetAddresses.concat([
                {
                    chainId: 137,
                    targetAddress: globalSponsoredContract,
                    isGlobal: true
                }
            ]));
        });
    });
    describe('deleteSponsoredAddress', () => {
        const _setResolvedDeleteSponsoredAddress = () => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressRepository_1.default.deleteSponsoredAddress).mockResolvedValue({});
        };
        const targetAddress = '0x1';
        const projectId = 'id_1';
        beforeEach(() => {
            _setResolvedDeleteSponsoredAddress();
        });
        it(`Given a targetAddress and projectId, when deleting the sponsored Addresses, then send right params to repository`, async () => {
            await sponsoredAddressService_1.default.deleteSponsoredAddress(projectId, targetAddress, CHAIN_ID);
            expect(sponsoredAddressRepository_1.default.deleteSponsoredAddress).toHaveBeenCalledWith(projectId, targetAddress, CHAIN_ID);
        });
    });
    describe('isSponsoredAddress', () => {
        const _setResolvedDeleteSponsoredAddress = () => {
            (0, testUtils_1.getFunctionMock)(sponsoredAddressRepository_1.default.deleteSponsoredAddress).mockResolvedValue({});
        };
        const targetAddress = 'target_Address';
        const projectId = 'id_1';
        const functionSelector = '0x1';
        const WALLET_ADDRESS = '0x6341a55dd860BBEEcc1614a27cC1fFa452397baD';
        const proxyDelayAddress = '0x_proxyDelayAddress';
        const delayModuleFactoryAddress = '0x_delayModuleFactoryAddress';
        beforeEach(() => {
            _setResolvedDeleteSponsoredAddress();
        });
        it(`Given a non sponsored transaction, when checking if an address is sponsored , then return false`, async () => {
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, functionSelector, WALLET_ADDRESS, targetAddress, CHAIN_ID);
            expect(result).toEqual(false);
        });
        it(`Given a add owner transaction, when checking if an address is sponsored, then return yes`, async () => {
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, sponsoredAddressTypes_1.DefaultSponsoredFunctions.ADD_OWNER_FUNCTION_SELECTOR, WALLET_ADDRESS, WALLET_ADDRESS, CHAIN_ID);
            expect(result).toEqual(true);
        });
        it(`Given a remove owner transaction, when checking if an address is sponsored, then return yes`, async () => {
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, sponsoredAddressTypes_1.DefaultSponsoredFunctions.REMOVE_OWNER_FUNCTION_SELECTOR, WALLET_ADDRESS, WALLET_ADDRESS, CHAIN_ID);
            expect(result).toEqual(true);
        });
        it(`Given a enable guardian transaction, when checking if an address is sponsored, then return yes`, async () => {
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, sponsoredAddressTypes_1.DefaultSponsoredFunctions.ENABLE_MODULE_FUNCTION_SELECTOR, WALLET_ADDRESS, WALLET_ADDRESS, CHAIN_ID);
            expect(result).toEqual(true);
        });
        it(`Given a set delay transaction, when checking if an address is sponsored, then return yes`, async () => {
            (0, testUtils_1.getFunctionMock)(blockchainService_1.default.getProvider).mockResolvedValue('provider');
            (0, testUtils_1.getFunctionMock)(safeService_1.default.isModuleEnabled).mockResolvedValue(true);
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, sponsoredAddressTypes_1.DefaultSponsoredFunctions.SET_DELAY_TX_NONCE_SELECTOR, WALLET_ADDRESS, proxyDelayAddress, CHAIN_ID, proxyDelayAddress);
            expect(result).toEqual(true);
        });
        it(`Given a deploy delay transaction, when checking if an address is sponsored, then return yes`, async () => {
            const result = await sponsoredAddressService_1.default.isSponsoredAddress(projectId, sponsoredAddressTypes_1.DefaultSponsoredFunctions.DEPLOY_DELAY_MODULE_FUNCTION_SELECTOR, WALLET_ADDRESS, delayModuleFactoryAddress, CHAIN_ID);
            expect(result).toEqual(true);
        });
    });
    /*   describe('areTxSponsored', () => {
      const projectId = 'id_1'
      const WALLET_ADDRESS = '0x6341a55dd860BBEEcc1614a27cC1fFa452397baD'
      const moduleFactoryAddress = '0x_delayModuleFactoryAddress'
      const delayAddress = 'ff0e363157da4793FbB3395c3b0aD043856e2ff2'
  
      const sponsoredTx = [
        {
          to: WALLET_ADDRESS,
          data: DefaultSponsoredFunctions.ADD_OWNER_FUNCTION_SELECTOR,
          value: '0x'
        }
      ]
  
      const setUpDelayTx = [
        {
          to: moduleFactoryAddress,
          value: '0x',
          data: '0xf1ab873c000000000000000000000000d54895b1121a2ee3f37b502f507631fa1331bed60000000000000000000000000000000000000000000000000000000000000060000000000000000000000000b58405bce201f8a6254718bb5a9bb6ac55e937a000000000000000000000000000000000000000000000000000000000000000e4a4f9edbf000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b58405bce201f8a6254718bb5a9bb6ac55e937a0000000000000000000000000b58405bce201f8a6254718bb5a9bb6ac55e937a0000000000000000000000000b58405bce201f8a6254718bb5a9bb6ac55e937a00000000000000000000000000000000000000000000000000000000000014a780000000000000000000000000000000000000000000000000000000000000e1000000000000000000000000000000000000000000000000000000000'
        },
        {
          to: WALLET_ADDRESS,
          value: '0x',
          data: `0x610b5925000000000000000000000000${delayAddress}`
        },
        {
          to: `0x${delayAddress}`,
          value: '0x',
          data: '0x610b5925000000000000000000000000282c6c8769c67008f9cdbf5a9a99358455125413'
        }
      ]
  
      const nonSponsoredTx = [
        {
          to: '0x4FbF9EE4B2AF774D4617eAb027ac2901a41a7b5F',
          data: '0x123',
          value: '0x'
        }
      ]
  
      const targetAddresses = [
        { chainId: 137, targetAddress: '0x1', isGlobal: false },
        { chainId: 137, targetAddress: '0x2', isGlobal: false }
      ]
  
      const _setResolvedGetAllSponsoredAddress = (): void => {
        getFunctionMock(
          sponsoredAddressRepository.getSponsoredAddressesByProjectId
        ).mockResolvedValue(targetAddresses)
      }
  
      it(`Given a sponsored transaction, when checking if an address is sponsored, then return true`, async () => {
        _setResolvedGetAllSponsoredAddress()
        const result = await sponsoredAddressService.areTxSponsored({
          projectId,
          walletAddress: WALLET_ADDRESS,
          chainId: CHAIN_ID,
          txs: sponsoredTx
        })
  
        expect(result).toEqual(true)
      })
  
      it(`Given a setup delay sponsored transaction, when checking if an address is sponsored, then return true`, async () => {
        const result = await sponsoredAddressService.areTxSponsored({
          projectId,
          walletAddress: WALLET_ADDRESS,
          chainId: CHAIN_ID,
          txs: setUpDelayTx
        })
  
        expect(result).toEqual(true)
      })
  
      it(`Given a non sponsored transaction, when checking if an address is sponsored, then return false`, async () => {
        const result = await sponsoredAddressService.areTxSponsored({
          projectId,
          walletAddress: WALLET_ADDRESS,
          chainId: CHAIN_ID,
          txs: nonSponsoredTx
        })
  
        expect(result).toEqual(false)
      })
    }) */
});
//# sourceMappingURL=sponsoredAddressService.spec.js.map