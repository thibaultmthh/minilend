"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testObjectIds = exports.testIds = exports.getMongoMockPack = void 0;
const mongodb_1 = require("mongodb");
const testUtils_1 = require("../../src/../tests/unit/testUtils");
const getMongoMockPack = (collectionNames) => {
    const collectionsMocks = {};
    collectionNames.forEach((collectionName) => {
        collectionsMocks[collectionName] = {
            collectionFunctions: {
                insertMany: jest.fn(),
                insertOne: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                aggregate: jest.fn(),
                findOneAndUpdate: jest.fn(),
                updateOne: jest.fn(),
                findOneAndDelete: jest.fn(),
                countDocuments: jest.fn()
            },
            findFunctions: {
                toArray: jest.fn()
            },
            aggregateFunctions: {
                toArray: jest.fn()
            }
        };
        collectionsMocks[collectionName];
    });
    const setupMongoMocks = (getCollection) => {
        (0, testUtils_1.getFunctionMock)(getCollection).mockImplementation((collectionName) => {
            if (!collectionsMocks[collectionName]) {
                throw new Error(`This collection name was not passed when initializing mocks:${collectionName}`);
            }
            return collectionsMocks[collectionName].collectionFunctions;
        });
        Object.values(collectionsMocks).forEach((collectionMocks) => {
            collectionMocks.collectionFunctions.find.mockReturnValue(collectionMocks.findFunctions);
            collectionMocks.collectionFunctions.aggregate.mockReturnValue(collectionMocks.aggregateFunctions);
        });
    };
    const expectCollectionFunctionToHaveBeenCalledWith = (collectionName, functionName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...params) => {
        expect(collectionsMocks[collectionName].collectionFunctions[functionName]).toHaveBeenCalledWith(...params);
    };
    return {
        collectionsMocks,
        setupMongoMocks,
        expectCollectionFunctionToHaveBeenCalledWith
    };
};
exports.getMongoMockPack = getMongoMockPack;
exports.testIds = [
    '63bd9ba108dede75de9a0b92',
    '63b6f991f8202ccc81636135',
    '63b6f991f8202ccc81636133',
    '63b6f991f8202ccc8163613b',
    '63b6f43124779d51c79a17f2',
    '63b6f991f8202ccc81636135',
    '63b6f991f8202ccc81636133'
];
exports.testObjectIds = [
    new mongodb_1.ObjectId('63bd9ba108dede75de9a0b92'),
    new mongodb_1.ObjectId('63b6f991f8202ccc81636135'),
    new mongodb_1.ObjectId('63b6f991f8202ccc81636133'),
    new mongodb_1.ObjectId('63b6f991f8202ccc8163613b'),
    new mongodb_1.ObjectId('63b6f43124779d51c79a17f2'),
    new mongodb_1.ObjectId('63b6f991f8202ccc81636135'),
    new mongodb_1.ObjectId('63b6f991f8202ccc81636133')
];
exports.default = { getMongoMockPack: exports.getMongoMockPack, testIds: exports.testIds, testObjectIds: exports.testObjectIds };
//# sourceMappingURL=mongoMock.js.map