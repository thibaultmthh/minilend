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
const mockdate_1 = __importDefault(require("mockdate"));
const mongoMock_1 = __importStar(require("../../tests/unit/mongoMock"));
const mongoService_1 = __importDefault(require("../services/mongoService"));
const projectRepository_1 = __importDefault(require("./projectRepository"));
const projectTypes_1 = require("./projectTypes");
const { PROJECT_COLLECTION } = projectRepository_1.default;
const { testIds } = mongoMock_1.default;
jest.mock('@/services/mongoService', () => ({
    getCollection: jest.fn()
}));
describe('projectRepository', () => {
    const projectId = testIds[0];
    const name = 'projectName';
    const chainId = 137;
    const scopes = [projectTypes_1.ProductScope.CONNECT];
    const domains = ['cometh.io'];
    const mockedProject = {
        id: projectId,
        name,
        chainId,
        scopes,
        domains
    };
    const { collectionsMocks, setupMongoMocks, expectCollectionFunctionToHaveBeenCalledWith } = (0, mongoMock_1.getMongoMockPack)([PROJECT_COLLECTION]);
    beforeEach(() => {
        setupMongoMocks(mongoService_1.default.getCollection);
        collectionsMocks[PROJECT_COLLECTION].collectionFunctions.insertOne.mockResolvedValue({
            insertedId: projectId
        });
        collectionsMocks[PROJECT_COLLECTION].collectionFunctions.findOne.mockResolvedValue(mockedProject);
        collectionsMocks[PROJECT_COLLECTION].findFunctions.toArray.mockResolvedValue([mockedProject]);
        collectionsMocks[PROJECT_COLLECTION].collectionFunctions.findOneAndDelete.mockResolvedValue({});
        collectionsMocks[PROJECT_COLLECTION].collectionFunctions.findOneAndUpdate.mockResolvedValue(mockedProject);
    });
    beforeAll(() => {
        mockdate_1.default.set(new Date('2022-09-23'));
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('insertProject', () => {
        it(`Given a name, chaindId and scopes, when inserting the project in the collection, then send the right parameters in function`, async () => {
            await projectRepository_1.default.insertProject(projectId, name, chainId, scopes);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'insertOne', {
                _id: projectId,
                name,
                creationDate: new Date('2022-09-23'),
                chainId,
                scopes
            });
        });
    });
    describe('getProjectById', () => {
        it(`Given a projectId, when getting the project, then send right parameters in function`, async () => {
            await projectRepository_1.default.getProjectById(projectId);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'findOne', { _id: projectId });
        });
    });
    describe('getProjectsByIds', () => {
        it(`Given a projectId, when getting the project, then send right parameters in function`, async () => {
            await projectRepository_1.default.getProjectsByIds([projectId]);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'find', {
                _id: { $in: [projectId] }
            });
        });
    });
    describe('countProjects', () => {
        it(`Given no parameter, when getting the projects count, then send right parameters in function`, async () => {
            await projectRepository_1.default.countProjects();
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'countDocuments');
        });
    });
    describe('deleteProject', () => {
        it(`Given a projectId, when deleting the project in the collection, then send the right parameters in function`, async () => {
            await projectRepository_1.default.deleteProject(projectId);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'findOneAndDelete', { _id: projectId });
        });
    });
    describe('updateProjectScopes', () => {
        it(`Given a projectId and scopes, when updating the scopes of the project in the collection, then send the right parameters in function`, async () => {
            await projectRepository_1.default.updateProjectScopes(projectId, scopes);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'findOneAndUpdate', { _id: projectId }, {
                $set: {
                    scopes
                }
            }, {
                returnDocument: 'after'
            });
        });
    });
    describe('updateProjectDomains', () => {
        it(`Given a projectId and domains, when updating the domains of the project in the collection, then send the right parameters in function`, async () => {
            await projectRepository_1.default.updateProjectDomains(projectId, domains);
            expectCollectionFunctionToHaveBeenCalledWith(PROJECT_COLLECTION, 'findOneAndUpdate', { _id: projectId }, {
                $set: {
                    domains
                }
            }, {
                returnDocument: 'after'
            });
        });
    });
});
//# sourceMappingURL=projectRepository.spec.js.map