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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delayModuleService = __importStar(require("./delayModuleService"));
const multicallService_1 = __importDefault(require("./multicallService"));
const safeService_1 = __importDefault(require("./safeService"));
const { MultiCallInterface } = multicallService_1.default;
const { SafeInterface } = safeService_1.default;
describe('delayModuleService', () => {
    describe('getDelayAddress', () => {
        it('should return correct delay module adress', async () => {
            const chainId = 137;
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const address = await delayModuleService.getDelayAddress(chainId, safe, {
                moduleAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
                moduleFactoryAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                cooldown: 100,
                expiration: 0
            });
            expect(address).toEqual('0x9f1DA52d8639dF18b2C95Fc5c0d08F5F8b07203B');
        });
    });
    describe('computeRecoveryMultiTx', () => {
        it('should create a transaction to recover a safe with one owner', async () => {
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const owners = ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'];
            const threshold = 1;
            const newOwners = ['0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'];
            const newThreshold = 1;
            const data = await delayModuleService.computeRecoveryMultiTx(safe, owners, threshold, newOwners, newThreshold);
            const { calls } = MultiCallInterface.parseTransaction({ data }).args;
            expect(calls.length).toEqual(1);
            expect(calls[0].target).toEqual(safe);
            const tx0 = SafeInterface.parseTransaction({ data: calls[0].callData });
            expect(tx0.functionFragment.name).toEqual('swapOwner');
            expect(tx0.args.prevOwner).toEqual('0x0000000000000000000000000000000000000001');
            expect(tx0.args.oldOwner).toEqual(owners[0]);
            expect(tx0.args.newOwner).toEqual(newOwners[0]);
        });
        it('should create a transaction to recover a safe with one old owner with 2 new owners', async () => {
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const owners = ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'];
            const threshold = 1;
            const newOwners = [
                '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
                '0x34cb778eA0B3e386a16616EC643f06E900BdEa26'
            ];
            const newThreshold = 2;
            const data = await delayModuleService.computeRecoveryMultiTx(safe, owners, threshold, newOwners, newThreshold);
            const { calls } = MultiCallInterface.parseTransaction({ data }).args;
            expect(calls.length).toEqual(2);
            expect(calls[0].target).toEqual(safe);
            expect(calls[1].target).toEqual(safe);
            const tx0 = SafeInterface.parseTransaction({ data: calls[0].callData });
            expect(tx0.functionFragment.name).toEqual('swapOwner');
            expect(tx0.args.prevOwner).toEqual('0x0000000000000000000000000000000000000001');
            expect(tx0.args.oldOwner).toEqual(owners[0]);
            expect(tx0.args.newOwner).toEqual(newOwners[0]);
            const tx1 = SafeInterface.parseTransaction({ data: calls[1].callData });
            expect(tx1.functionFragment.name).toEqual('addOwnerWithThreshold');
            expect(tx1.args.owner).toEqual('0x34cb778eA0B3e386a16616EC643f06E900BdEa26');
            expect(tx1.args._threshold.toNumber()).toEqual(2);
        });
        it('should create a transaction to recover a safe with multiple old owners with one new owner', async () => {
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const owners = [
                '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
                '0x34cb778eA0B3e386a16616EC643f06E900BdEa26'
            ];
            const threshold = 2;
            const newOwners = ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'];
            const newThreshold = 1;
            const data = await delayModuleService.computeRecoveryMultiTx(safe, owners, threshold, newOwners, newThreshold);
            const { calls } = MultiCallInterface.parseTransaction({ data }).args;
            expect(calls.length).toEqual(3);
            expect(calls[0].target).toEqual(safe);
            expect(calls[1].target).toEqual(safe);
            expect(calls[2].target).toEqual(safe);
            const tx0 = SafeInterface.parseTransaction({ data: calls[0].callData });
            expect(tx0.functionFragment.name).toEqual('changeThreshold');
            expect(tx0.args._threshold.toNumber()).toEqual(1);
            const tx1 = SafeInterface.parseTransaction({ data: calls[1].callData });
            expect(tx1.functionFragment.name).toEqual('removeOwner');
            expect(tx1.args.prevOwner).toEqual(owners[0]);
            expect(tx1.args.owner).toEqual(owners[1]);
            expect(tx1.args._threshold.toNumber()).toEqual(1);
            const tx2 = SafeInterface.parseTransaction({ data: calls[2].callData });
            expect(tx2.functionFragment.name).toEqual('swapOwner');
            expect(tx2.args.prevOwner).toEqual('0x0000000000000000000000000000000000000001');
            expect(tx2.args.oldOwner).toEqual(owners[0]);
            expect(tx2.args.newOwner).toEqual(newOwners[0]);
        });
        it('should create a transaction to recover a safe with multiple old owners with multiple new owners', async () => {
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const owners = [
                '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
                '0x34cb778eA0B3e386a16616EC643f06E900BdEa26',
                '0x35Cb778eA0b3E386A16616ec643F06e900bdeA26',
                '0x36cB778EA0B3e386A16616eC643f06E900BDEA26'
            ];
            const threshold = 1;
            const newOwners = [
                '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                '0xe5a32f9CCb22b65845A49E3A02A3831dCF948CD6'
            ];
            const newThreshold = 1;
            const data = await delayModuleService.computeRecoveryMultiTx(safe, owners, threshold, newOwners, newThreshold);
            const { calls } = MultiCallInterface.parseTransaction({ data }).args;
            expect(calls.length).toEqual(5);
            expect(calls[0].target).toEqual(safe);
            expect(calls[1].target).toEqual(safe);
            expect(calls[2].target).toEqual(safe);
            expect(calls[3].target).toEqual(safe);
            const tx0 = SafeInterface.parseTransaction({ data: calls[0].callData });
            expect(tx0.functionFragment.name).toEqual('removeOwner');
            expect(tx0.args.prevOwner).toEqual(owners[0]);
            expect(tx0.args.owner).toEqual(owners[1]);
            expect(tx0.args._threshold.toNumber()).toEqual(1);
            const tx1 = SafeInterface.parseTransaction({ data: calls[1].callData });
            expect(tx1.functionFragment.name).toEqual('removeOwner');
            expect(tx1.args.prevOwner).toEqual(owners[0]);
            expect(tx1.args.owner).toEqual(owners[2]);
            expect(tx1.args._threshold.toNumber()).toEqual(1);
            const tx2 = SafeInterface.parseTransaction({ data: calls[2].callData });
            expect(tx2.functionFragment.name).toEqual('removeOwner');
            expect(tx2.args.prevOwner).toEqual(owners[0]);
            expect(tx2.args.owner).toEqual(owners[3]);
            expect(tx2.args._threshold.toNumber()).toEqual(1);
            const tx3 = SafeInterface.parseTransaction({ data: calls[3].callData });
            expect(tx3.functionFragment.name).toEqual('swapOwner');
            expect(tx3.args.prevOwner).toEqual('0x0000000000000000000000000000000000000001');
            expect(tx3.args.oldOwner).toEqual(owners[0]);
            expect(tx3.args.newOwner).toEqual(newOwners[0]);
            const tx4 = SafeInterface.parseTransaction({ data: calls[4].callData });
            expect(tx4.functionFragment.name).toEqual('addOwnerWithThreshold');
            expect(tx4.args.owner).toEqual(newOwners[1]);
            expect(tx4.args._threshold.toNumber()).toEqual(1);
        });
    });
    describe('getNewOwnersFromCalldata', () => {
        it('should create a transaction to recover a safe with one owner', async () => {
            const safe = '0xF9df67B745A2cD230c0314b08FB748b6Ce2484D4';
            const newOwners = [
                '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                '0xe5a32f9CCb22b65845A49E3A02A3831dCF948CD6'
            ];
            const data = '0x252dba420000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000f9df67b745a2cd230c0314b08fb748b6ce2484d400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000024694e80c3000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000f9df67b745a2cd230c0314b08fb748b6ce2484d400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064f8dc5dd9000000000000000000000000dc64a140aa3e981100a9beca4e685f962f0cf6c900000000000000000000000034cb778ea0b3e386a16616ec643f06e900bdea26000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000f9df67b745a2cd230c0314b08fb748b6ce2484d400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064e318b52b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000dc64a140aa3e981100a9beca4e685f962f0cf6c9000000000000000000000000cf7ed3acca5a467e9e704c703e8d87f634fb0fc900000000000000000000000000000000000000000000000000000000000000000000000000000000f9df67b745a2cd230c0314b08fb748b6ce2484d4000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000440d582f13000000000000000000000000e5a32f9ccb22b65845a49e3a02a3831dcf948cd6000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000';
            const request = {
                to: safe,
                value: '0',
                data,
                operation: 0,
                executionTime: 0
            };
            const newOwner = delayModuleService.getNewOwnersFromCalldata(request);
            expect(newOwner).toEqual(newOwners);
        });
    });
});
//# sourceMappingURL=delayModuleService.spec.js.map