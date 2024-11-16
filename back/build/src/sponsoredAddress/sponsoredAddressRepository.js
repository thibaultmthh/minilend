"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoService_1 = require("../services/mongoService");
const SPONSORED_ADDRESS_COLLECTION = 'sponsoredAddress';
const sponsorAddressProjection = {
    _id: 0,
    targetAddress: 1,
    chainId: 1
};
const _getSponsoredAddressCollection = () => {
    return (0, mongoService_1.getCollection)(SPONSORED_ADDRESS_COLLECTION);
};
const insertSponsoredAddress = async (projectId, targetAddress, chainId) => {
    await _getSponsoredAddressCollection().insertOne({
        projectId,
        targetAddress: targetAddress.toLowerCase(),
        chainId,
        isGlobal: false
    });
};
const getSponsoredAddress = async (projectId, targetAddress, chainId) => {
    const sponsoredAddress = await _getSponsoredAddressCollection().findOne({
        projectId,
        targetAddress: targetAddress.toLowerCase(),
        chainId
    }, {
        projection: sponsorAddressProjection
    });
    return sponsoredAddress;
};
const getSponsoredAddressesByProjectId = async (projectId, chainId, limit, offset) => {
    const sponsoredAddress = await _getSponsoredAddressCollection()
        .find({
        projectId,
        chainId
    }, {
        projection: sponsorAddressProjection,
        sort: {
            creationDate: -1
        },
        skip: offset,
        limit: limit
    })
        .toArray();
    return sponsoredAddress;
};
const deleteSponsoredAddress = async (projectId, targetAddress, chainId) => {
    await _getSponsoredAddressCollection().findOneAndDelete({
        projectId,
        targetAddress: targetAddress.toLowerCase(),
        chainId
    });
};
const getSponsoredAddressesCountByProjectId = async (projectId) => {
    const sponsoredAddresses = await _getSponsoredAddressCollection().countDocuments({
        projectId
    });
    return sponsoredAddresses;
};
exports.default = {
    insertSponsoredAddress,
    getSponsoredAddress,
    getSponsoredAddressesByProjectId,
    deleteSponsoredAddress,
    getSponsoredAddressesCountByProjectId,
    SPONSORED_ADDRESS_COLLECTION
};
//# sourceMappingURL=sponsoredAddressRepository.js.map