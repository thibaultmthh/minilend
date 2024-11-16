"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const encodeP256DeployFunction = async (x, y) => {
    const functionInterface = new ethers_1.ethers.utils.Interface([
        'function create(uint256 x, uint256 y)'
    ]);
    return functionInterface.encodeFunctionData('create', [x, y]);
};
const predictSignerAddress = async (publicKeyX, publicKeyY, webAuthnDeploymentParams) => {
    const implementation = webAuthnDeploymentParams.P256SignerContractAddress;
    if (!implementation)
        throw new Error('P256 implementation not in signer object');
    const salt = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.solidityPack(['uint256', 'uint256'], [publicKeyX, publicKeyY]));
    // Init code of minimal proxy from solady 0.0.123
    const initCode = `0x602c3d8160093d39f33d3d3d3d363d3d37363d73${implementation.substring(2)}5af43d3d93803e602a57fd5bf3`;
    const initCodeHash = ethers_1.ethers.utils.keccak256(initCode);
    return ethers_1.ethers.utils.getCreate2Address(webAuthnDeploymentParams.P256FactoryContract, salt, initCodeHash);
};
exports.default = {
    encodeP256DeployFunction,
    predictSignerAddress
};
//# sourceMappingURL=p256FactoryService.js.map