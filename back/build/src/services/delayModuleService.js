"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewOwnersFromCalldata = exports.computeRecoveryMultiTx = exports.createRecoveryMultiTxForNotDeployedSafe = exports.createRecoveryMultiTx = exports.isQueueEmpty = exports.createExecuteTx = exports.getNextTxToExecute = exports.getDelayAddress = exports.getGuardianAddress = exports.isDeployed = exports.DelayModule = void 0;
const ethers_1 = require("ethers");
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const delayModule_json_1 = __importDefault(require("../contracts/abi/delayModule.json"));
const multicallService_1 = __importDefault(require("../services/multicallService"));
const safeService_1 = __importDefault(require("../services/safeService"));
const blockchainService_1 = __importDefault(require("./blockchainService"));
const logger_1 = __importDefault(require("./logger"));
const { MultiCallInterface } = multicallService_1.default;
const { SafeInterface } = safeService_1.default;
exports.DelayModule = new ethers_1.ethers.utils.Interface(delayModule_json_1.default);
const isDeployed = async ({ delayAddress, chainId }) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const delay = new ethers_1.Contract(delayAddress, delayModule_json_1.default, provider);
    try {
        await delay.deployed();
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isDeployed = isDeployed;
const getGuardianAddress = async ({ delayAddress, chainId }) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const delay = new ethers_1.Contract(delayAddress, delayModule_json_1.default, provider);
    const SENTINEL = '0x0000000000000000000000000000000000000001';
    const modulesPaginated = await delay.getModulesPaginated(SENTINEL, 1);
    return modulesPaginated[0][0];
};
exports.getGuardianAddress = getGuardianAddress;
const getDelayAddress = (chainId, safe, context = {}) => {
    const network = globalConfig_1.default.networks[chainId];
    const cooldown = context.cooldown || network.recoveryCooldown;
    const expiration = context.expiration || network.recoveryExpiration;
    const moduleAddress = context.moduleAddress || network.delayModuleAddress;
    const factoryAddress = context.moduleFactoryAddress || network.moduleFactoryAddress;
    const args = ethers_1.ethers.utils.defaultAbiCoder.encode(['address', 'address', 'address', 'uint256', 'uint256'], [safe, safe, safe, cooldown, expiration]);
    const initializer = exports.DelayModule.encodeFunctionData('setUp', [args]);
    const code = `0x602d8060093d393df3363d3d373d3d3d363d73${moduleAddress.slice(2)}5af43d82803e903d91602b57fd5bf3`;
    const salt = ethers_1.ethers.utils.solidityKeccak256(['bytes32', 'uint256'], [ethers_1.ethers.utils.keccak256(initializer), safe]);
    return Promise.resolve(ethers_1.ethers.utils.getCreate2Address(factoryAddress, salt, ethers_1.ethers.utils.keccak256(code)));
};
exports.getDelayAddress = getDelayAddress;
const getNextTxToExecute = async (chainId, moduleAddress) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const contract = new ethers_1.ethers.Contract(moduleAddress, delayModule_json_1.default, provider);
    // we could call isQueueEmpty but we need txNonce after the check
    const [txNonce, queueNonce, txCooldown] = await Promise.all([
        contract.txNonce(),
        contract.queueNonce(),
        contract.txCooldown()
    ]);
    // txNonce cannot be greater than queueNonce
    if (txNonce.eq(queueNonce))
        return null;
    const creationTime = await contract.txCreatedAt(txNonce);
    const executionTime = creationTime.toNumber() + txCooldown.toNumber();
    const batchSize = 10000;
    let currentBlock = await provider.getBlockNumber();
    let matchingEvent = null;
    while (currentBlock >= 0 && !matchingEvent) {
        const fromBlock = Math.max(0, currentBlock - batchSize + 1);
        const toBlock = currentBlock;
        const filter = contract.filters.TransactionAdded(txNonce);
        const batchEvents = await contract.queryFilter(filter, fromBlock, toBlock);
        logger_1.default.info('batchEvents', { batchEvents });
        if (batchEvents.length > 0) {
            matchingEvent = batchEvents[0];
            break;
        }
        currentBlock = Math.max(0, currentBlock - batchSize);
    }
    if (!matchingEvent)
        return null;
    const event = matchingEvent.args;
    return {
        to: event[2],
        data: event[4],
        value: event[3],
        operation: event[5],
        executionTime
    };
};
exports.getNextTxToExecute = getNextTxToExecute;
const createExecuteTx = async (to, value, data, operation) => {
    return exports.DelayModule.encodeFunctionData('executeNextTx', [
        to,
        value,
        data,
        operation
    ]);
};
exports.createExecuteTx = createExecuteTx;
const isQueueEmpty = async (chainId, moduleAddress) => {
    const provider = await blockchainService_1.default.getProvider(chainId);
    const contract = new ethers_1.ethers.Contract(moduleAddress, delayModule_json_1.default, provider);
    const [txNonce, queueNonce] = await Promise.all([
        contract.txNonce(),
        contract.queueNonce()
    ]);
    return txNonce.eq(queueNonce);
};
exports.isQueueEmpty = isQueueEmpty;
const _prepareRecoveryMultiTx = async (chainId, safeAddress, context, txData) => {
    const { multicallAddress } = globalConfig_1.default.networks[chainId];
    const delayAddress = await (0, exports.getDelayAddress)(chainId, safeAddress, context);
    return {
        to: delayAddress,
        data: exports.DelayModule.encodeFunctionData('execTransactionFromModule', [
            multicallAddress,
            /* value: */ 0,
            txData,
            /* operation: (0: call; 1: delegatecall) */ 1
        ]),
        value: 0,
        operation: 0,
        safeTxGas: 0,
        baseGas: 0,
        gasPrice: 0,
        gasToken: ethers_1.ethers.constants.AddressZero,
        refundReceiver: ethers_1.ethers.constants.AddressZero
    };
};
/*
 * This function returns a Multicall transaction that recovers a wallet, given an array
 * of new owners and a new threshold
 */
const createRecoveryMultiTx = async (chainId, safeAddress, newOwners, newThreshold, context = {}) => {
    const [owners, oldThreshold] = await Promise.all([
        safeService_1.default.getOwners(chainId, safeAddress),
        safeService_1.default.getThreshold(safeAddress, chainId)
    ]);
    if (!owners || !oldThreshold)
        throw new Error('could not retrieve Safe information');
    const data = await (0, exports.computeRecoveryMultiTx)(safeAddress, owners, oldThreshold, newOwners, newThreshold);
    return _prepareRecoveryMultiTx(chainId, safeAddress, context, data);
};
exports.createRecoveryMultiTx = createRecoveryMultiTx;
const createRecoveryMultiTxForNotDeployedSafe = async (chainId, safeAddress, safeOwner, newOwners, newThreshold, context = {}) => {
    const data = await (0, exports.computeRecoveryMultiTx)(safeAddress, [safeOwner], 1, newOwners, newThreshold);
    return _prepareRecoveryMultiTx(chainId, safeAddress, context, data);
};
exports.createRecoveryMultiTxForNotDeployedSafe = createRecoveryMultiTxForNotDeployedSafe;
const computeRecoveryMultiTx = async (safe, owners, threshold, newOwners, newThreshold) => {
    const txs = [];
    // few things to note here:
    // - we cannot reset owners and threshold
    // - there can not be less owners than the threshold, even temporarily
    // - owners is a linked list represented as a mapping.
    //    * owners[0x1] is the first owner.
    //    * owners[firstOwner] is the second owner and so on.
    //   When calling the getOwners() method, the order is preserved, which means we can use
    //   this ordered array to reconstruct the linked list. This makes things easier
    // We could create an optimized algorithm to re-arrange the linked list, instead
    // we make it easier by temporarily set the threshold to 1, removing all old owners,
    // swap the first owner then add all the other new owners. Finally we set the new threshold.
    // All these calls are wrapped in a multicall aggregate call. It has to be queued on the
    // Delay module by the guardian
    if (threshold != 1) {
        txs.push(SafeInterface.encodeFunctionData('changeThreshold', [1]));
    }
    for (let i = 1; i < owners.length; ++i) {
        txs.push(SafeInterface.encodeFunctionData('removeOwner', [owners[0], owners[i], 1]));
    }
    const SENTINEL = '0x0000000000000000000000000000000000000001';
    txs.push(SafeInterface.encodeFunctionData('swapOwner', [
        SENTINEL,
        owners[0],
        newOwners[0]
    ]));
    for (let i = 1; i < newOwners.length; ++i) {
        let t = 1;
        if (i === newOwners.length - 1)
            t = newThreshold;
        txs.push(SafeInterface.encodeFunctionData('addOwnerWithThreshold', [
            newOwners[i],
            t
        ]));
    }
    const calls = txs.map((tx) => ({ target: safe, callData: tx }));
    const data = await multicallService_1.default.generateMulticallTransactionData(calls);
    return data;
};
exports.computeRecoveryMultiTx = computeRecoveryMultiTx;
const getNewOwnersFromCalldata = (recoveryRequest) => {
    const { calls } = MultiCallInterface.parseTransaction({
        data: recoveryRequest.data
    }).args;
    const newOwners = [];
    for (let i = 0; i < calls.length; i++) {
        const tx = SafeInterface.parseTransaction({ data: calls[i].callData });
        if (tx.functionFragment.name == 'swapOwner') {
            newOwners.push(tx.args.newOwner);
        }
        if (tx.functionFragment.name == 'addOwnerWithThreshold') {
            newOwners.push(tx.args.owner);
        }
    }
    return newOwners;
};
exports.getNewOwnersFromCalldata = getNewOwnersFromCalldata;
//# sourceMappingURL=delayModuleService.js.map