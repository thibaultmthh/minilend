"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const mongoMock_1 = require("../../tests/unit/mongoMock");
const testUtils_1 = require("../../tests/unit/testUtils");
const projectRepository_1 = __importDefault(require("./projectRepository"));
const projectService_1 = __importDefault(require("./projectService"));
const projectTypes_1 = require("./projectTypes");
jest.mock('./projectRepository', () => ({
    getProjectById: jest.fn(),
    getProjectsByIds: jest.fn(),
    updateProjectScopes: jest.fn(),
    updateProjectDomains: jest.fn(),
    insertProject: jest.fn(),
    deleteProject: jest.fn()
}));
describe('projectService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    describe('createProject', () => {
        const projectId = mongoMock_1.testIds[0];
        const name = 'projectName';
        const chainId = 137;
        const scopes = [projectTypes_1.ProductScope.CONNECT];
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.insertProject).mockResolvedValue({
                _id: projectId,
                name,
                chainId,
                scopes
            });
        });
        it('Given a name, chainId and scopes, when inserting the project in db, then send proper params to repository', async () => {
            await projectService_1.default.createProject(projectId, name, chainId, scopes);
            expect(projectRepository_1.default.insertProject).toHaveBeenCalledWith(projectId, name, chainId, scopes);
        });
        it('Given a name, chainId and scopes, when inserting the project in db, then return the project information', async () => {
            const project = await projectService_1.default.createProject(projectId, name, chainId, scopes);
            expect(project).toEqual({
                id: projectId,
                name,
                chainId,
                scopes
            });
        });
    });
    describe('deleteProject', () => {
        const projectId = mongoMock_1.testIds[0];
        it('Given a projectId, when deleting the project in db, then send proper params to repository', async () => {
            await projectService_1.default.deleteProject(projectId);
            expect(projectRepository_1.default.deleteProject).toHaveBeenCalledWith(projectId);
        });
    });
    describe('getProject', () => {
        const projectId = mongoMock_1.testIds[0];
        const name = 'projectName';
        const chainId = 137;
        const scopes = [projectTypes_1.ProductScope.CONNECT];
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.getProjectById).mockResolvedValue({
                _id: projectId,
                name,
                chainId,
                scopes
            });
        });
        it(`Given a projectId, when getting the project, then send right params to repository`, async () => {
            await projectService_1.default.getProject(projectId);
            expect(projectRepository_1.default.getProjectById).toHaveBeenCalledWith(projectId);
        });
        it(`Given a projectId, when getting the project, then return the project information`, async () => {
            const project = await projectService_1.default.getProject(projectId);
            expect(project).toEqual({
                id: projectId,
                name,
                chainId,
                scopes
            });
        });
        it(`Given a projectId, when getting a project that does not exist, then throw an error`, async () => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.getProjectById).mockResolvedValue(null);
            await expect(projectService_1.default.getProject(projectId)).rejects.toThrow((0, http_errors_1.BadRequest)('This project does not exist'));
        });
    });
    describe('getProjects', () => {
        const projectId = mongoMock_1.testIds[0];
        const name = 'projectName';
        const chainId = 137;
        const scopes = [projectTypes_1.ProductScope.CONNECT];
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.getProjectsByIds).mockResolvedValue([
                {
                    _id: projectId,
                    name,
                    chainId,
                    scopes
                }
            ]);
        });
        it(`Given projectIds, when getting the projects, then send right params to repository`, async () => {
            await projectService_1.default.getProjects([projectId]);
            expect(projectRepository_1.default.getProjectsByIds).toHaveBeenCalledWith([
                projectId
            ]);
        });
        it(`Given projectIds, when getting the projects, then return the projects information`, async () => {
            const projects = await projectService_1.default.getProjects([projectId]);
            expect(projects).toEqual([
                {
                    id: projectId,
                    name,
                    chainId,
                    scopes
                }
            ]);
        });
    });
    describe('updateProjectScopes', () => {
        const projectId = mongoMock_1.testIds[0];
        const name = 'projectName';
        const chainId = 137;
        const scopes = [projectTypes_1.ProductScope.CONNECT];
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.updateProjectScopes).mockResolvedValue({
                _id: projectId,
                name,
                chainId,
                scopes
            });
        });
        it(`Given a projectId and scopes, when updating the scopes, then send right params to repository`, async () => {
            await projectService_1.default.updateProjectScopes(projectId, scopes);
            expect(projectRepository_1.default.updateProjectScopes).toHaveBeenCalledWith(projectId, scopes);
        });
        it(`Given a projectId and scopes, when updating the scopes, then return the project information`, async () => {
            const project = await projectService_1.default.updateProjectScopes(projectId, scopes);
            expect(project).toEqual({
                id: projectId,
                name,
                chainId,
                scopes
            });
        });
        it(`Given a projectId and scopes, when updating a project that does not exist, then throw an error`, async () => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.updateProjectScopes).mockResolvedValue(null);
            await expect(projectService_1.default.updateProjectScopes(projectId, scopes)).rejects.toThrow((0, http_errors_1.BadRequest)('This project does not exist'));
        });
    });
    describe('updateProjectDomains', () => {
        const projectId = mongoMock_1.testIds[0];
        const name = 'projectName';
        const chainId = 137;
        const domains = ['cometh.io'];
        beforeEach(() => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.updateProjectDomains).mockResolvedValue({
                _id: projectId,
                name,
                chainId,
                domains
            });
        });
        it(`Given a projectId and domains, when updating the domains, then send right params to repository`, async () => {
            await projectService_1.default.updateProjectDomains(projectId, domains);
            expect(projectRepository_1.default.updateProjectDomains).toHaveBeenCalledWith(projectId, domains);
        });
        it(`Given a projectId and domains, when updating the domains, then return the project information`, async () => {
            const project = await projectService_1.default.updateProjectDomains(projectId, domains);
            expect(project).toEqual({
                id: projectId,
                name,
                chainId,
                domains
            });
        });
        it(`Given a projectId and domains, when updating a project that does not exist, then throw an error`, async () => {
            (0, testUtils_1.getFunctionMock)(projectRepository_1.default.updateProjectDomains).mockResolvedValue(null);
            await expect(projectService_1.default.updateProjectDomains(projectId, domains)).rejects.toThrow((0, http_errors_1.BadRequest)('This project does not exist'));
        });
    });
});
//# sourceMappingURL=projectService.spec.js.map