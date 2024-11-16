"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressMock_1 = __importDefault(require("../../tests/unit/expressMock"));
const mongoMock_1 = require("../../tests/unit/mongoMock");
const testUtils_1 = require("../../tests/unit/testUtils");
const projectController_1 = __importDefault(require("./projectController"));
const projectService_1 = __importDefault(require("./projectService"));
const projectTypes_1 = require("./projectTypes");
jest.mock('./projectService', () => ({
    getProject: jest.fn(),
    getProjects: jest.fn(),
    createProject: jest.fn(),
    deleteProject: jest.fn()
}));
describe('projectController', () => {
    const projectId = mongoMock_1.testIds[0];
    const name = 'projectName';
    const chainId = 137;
    const scopes = [projectTypes_1.ProductScope.CONNECT];
    const { resMocks, setupResMocks, expectStatusAndPayloadWereSent } = expressMock_1.default.getExpressMockPack();
    beforeEach(() => {
        setupResMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createProject', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectService_1.default.createProject).mockResolvedValue({
                id: projectId,
                name,
                chainId,
                scopes
            });
        });
        const req = expressMock_1.default.createTestReq({}, undefined, {
            id: projectId,
            name,
            chainId,
            scopes
        });
        it('Given a name, chainId and scopes, when inserting the project in db, then send a success response', async () => {
            await projectController_1.default.createProject(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                project: {
                    id: projectId,
                    name,
                    chainId,
                    scopes
                }
            });
        });
        it('Given a name, chainId and scopes, when inserting the project in db, then send proper params to service', async () => {
            await projectController_1.default.createProject(req, resMocks);
            expect(projectService_1.default.createProject).toHaveBeenCalledWith(projectId, name, chainId, scopes);
        });
    });
    describe('getProject', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectService_1.default.getProject).mockResolvedValue({
                id: projectId,
                name,
                chainId,
                scopes
            });
        });
        const req = expressMock_1.default.createTestReq({}, { projectId });
        it('Given a projectId, when getting the project, then send a success response and the project', async () => {
            await projectController_1.default.getProject(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                project: {
                    id: projectId,
                    name,
                    chainId,
                    scopes
                }
            });
        });
        it('Given a projectId, when getting the project, then send proper params to service', async () => {
            await projectController_1.default.getProject(req, resMocks);
            expect(projectService_1.default.getProject).toHaveBeenCalledWith(projectId);
        });
    });
    describe('getProjects', () => {
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectService_1.default.getProjects).mockResolvedValue([
                {
                    id: projectId,
                    name,
                    chainId,
                    scopes
                }
            ]);
        });
        const req = expressMock_1.default.createTestReq({}, {}, {}, { projectIds: [projectId] });
        it('Given projectIds, when getting the projects, then send a success response and all projects', async () => {
            await projectController_1.default.getProjects(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true,
                projects: [
                    {
                        id: projectId,
                        name,
                        chainId,
                        scopes
                    }
                ]
            });
        });
        it('Given projectIds, when getting the projects, then send proper params to service', async () => {
            await projectController_1.default.getProjects(req, resMocks);
            expect(projectService_1.default.getProjects).toHaveBeenCalledWith([projectId]);
        });
    });
    describe('deleteProject', () => {
        const req = expressMock_1.default.createTestReq({}, { projectId });
        it('Given a projectId, when deleting the project in db, then send a success response', async () => {
            await projectController_1.default.deleteProject(req, resMocks);
            expectStatusAndPayloadWereSent(200, {
                success: true
            });
        });
        it('Given a projectId, when deleting the project in db, then send proper params to service', async () => {
            await projectController_1.default.deleteProject(req, resMocks);
            expect(projectService_1.default.deleteProject).toHaveBeenCalledWith(projectId);
        });
    });
});
//# sourceMappingURL=projectController.spec.js.map