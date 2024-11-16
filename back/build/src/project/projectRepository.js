"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const PROJECT_COLLECTION = 'project';
const _getProjectCollection = () => {
    return (0, mongoService_1.getCollection)(PROJECT_COLLECTION);
};
const insertProject = async (id, name, chainId, scopes) => {
    const creationDate = new Date();
    await _getProjectCollection().insertOne({
        _id: id,
        name,
        creationDate,
        chainId,
        scopes
    });
    return {
        _id: id,
        name,
        creationDate,
        chainId,
        scopes
    };
};
const getProjectById = async (projectId) => {
    return await _getProjectCollection().findOne({
        _id: projectId
    });
};
const getProjectsByIds = async (projectIds) => {
    return await _getProjectCollection()
        .find({
        _id: { $in: projectIds.map((id) => id) }
    })
        .toArray();
};
const deleteProject = async (projectId) => {
    await _getProjectCollection().findOneAndDelete({
        _id: projectId
    });
};
const countProjects = async () => {
    return await _getProjectCollection().countDocuments();
};
const updateProjectScopes = async (projectId, scopes) => {
    const update = await _getProjectCollection().findOneAndUpdate({
        _id: projectId
    }, {
        $set: {
            scopes
        }
    }, {
        returnDocument: 'after'
    });
    return update.value;
};
const updateProjectDomains = async (projectId, domains) => {
    const update = await _getProjectCollection().findOneAndUpdate({
        _id: projectId
    }, {
        $set: {
            domains
        }
    }, {
        returnDocument: 'after'
    });
    return update.value;
};
exports.default = {
    insertProject,
    getProjectById,
    getProjectsByIds,
    countProjects,
    deleteProject,
    updateProjectScopes,
    updateProjectDomains,
    PROJECT_COLLECTION
};
//# sourceMappingURL=projectRepository.js.map