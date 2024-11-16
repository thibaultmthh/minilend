"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const projectRepository_1 = __importDefault(require("./projectRepository"));
const getProject = async (projectId) => {
    const project = await projectRepository_1.default.getProjectById(projectId);
    if (project === null)
        throw (0, http_errors_1.BadRequest)('This project does not exist');
    return _formatProject(project);
};
const getProjects = async (projectIds) => {
    const projects = await projectRepository_1.default.getProjectsByIds(projectIds);
    return projects.map(_formatProject);
};
const createProject = async (id, name, chainId, scopes) => {
    const project = await projectRepository_1.default.insertProject(id, name, chainId, scopes);
    return _formatProject(project);
};
const deleteProject = async (projectId) => {
    return await projectRepository_1.default.deleteProject(projectId);
};
const updateProjectScopes = async (projectId, scopes) => {
    const project = await projectRepository_1.default.updateProjectScopes(projectId, scopes);
    if (project === null)
        throw (0, http_errors_1.BadRequest)('This project does not exist');
    return _formatProject(project);
};
const updateProjectDomains = async (projectId, domains) => {
    const project = await projectRepository_1.default.updateProjectDomains(projectId, domains);
    if (project === null)
        throw (0, http_errors_1.BadRequest)('This project does not exist');
    return _formatProject(project);
};
const _formatProject = (project) => {
    return {
        id: project._id,
        name: project.name,
        creationDate: project.creationDate,
        chainId: project.chainId,
        scopes: project.scopes,
        domains: project.domains,
        comethGuardianDisabled: project.comethGuardianDisabled
    };
};
exports.default = {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProjectScopes,
    updateProjectDomains
};
//# sourceMappingURL=projectService.js.map