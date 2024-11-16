"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStandardExecutorAbi = void 0;
exports.IStandardExecutorAbi = [
    {
        type: 'function',
        name: 'execute',
        inputs: [
            { name: 'target', type: 'address', internalType: 'address' },
            { name: 'value', type: 'uint256', internalType: 'uint256' },
            { name: 'data', type: 'bytes', internalType: 'bytes' }
        ],
        outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'payable'
    },
    {
        type: 'function',
        name: 'executeBatch',
        inputs: [
            {
                name: 'calls',
                type: 'tuple[]',
                internalType: 'struct Call[]',
                components: [
                    {
                        name: 'target',
                        type: 'address',
                        internalType: 'address'
                    },
                    { name: 'value', type: 'uint256', internalType: 'uint256' },
                    { name: 'data', type: 'bytes', internalType: 'bytes' }
                ]
            }
        ],
        outputs: [{ name: '', type: 'bytes[]', internalType: 'bytes[]' }],
        stateMutability: 'payable'
    }
];
//# sourceMappingURL=IStandardExecutor.js.map