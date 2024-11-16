"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kms_1 = require("@google-cloud/kms");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const asn1 = require('asn1.js');
const bn_js_1 = __importDefault(require("bn.js"));
const crypto_1 = __importDefault(require("crypto"));
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const keccak256_1 = __importDefault(require("keccak256"));
const globalConfig_1 = __importDefault(require("../config/globalConfig"));
const logger_1 = __importDefault(require("./logger"));
const EcdsaSigAsnParse = asn1.define('EcdsaSig', function () {
    // parsing this according to https://tools.ietf.org/html/rfc3279#section-2.2.3
    this.seq().obj(this.key('r').int(), this.key('s').int());
});
const kmsCredentials = {
    projectId: globalConfig_1.default.gcpKmsProjectId,
    locationId: globalConfig_1.default.gcpKmsLocationId,
    keyRingId: globalConfig_1.default.gcpKmsKeyRingId,
    keyId: globalConfig_1.default.gcpKmsKeyId,
    keyVersion: globalConfig_1.default.gcpKmsVersionId
};
const kms = new kms_1.KeyManagementServiceClient();
let versionName;
try {
    versionName = kms.cryptoKeyVersionPath(kmsCredentials.projectId, kmsCredentials.locationId, kmsCredentials.keyRingId, kmsCredentials.keyId, kmsCredentials.keyVersion);
}
catch (error) {
    logger_1.default.warn(`GCP KMS not or incorrectly configured: ${error.message}`);
}
const isGcpKmsSetup = () => {
    return versionName !== undefined;
};
const getPublicKey = async () => {
    const [publicKey] = await kms.getPublicKey({
        name: versionName
    });
    if (!publicKey || !publicKey.pem)
        throw new Error(`Can not find key: ${kmsCredentials.keyId}`);
    return publicKey;
};
const getAddress = async () => {
    const publicKey = await getPublicKey();
    const x509pem = publicKey.pem;
    const x509der = crypto_1.default
        .createPublicKey(x509pem)
        .export({ format: 'der', type: 'spki' });
    const rawXY = x509der.subarray(-64);
    // Derive address from raw public key
    const hashXY = (0, keccak256_1.default)(rawXY);
    const address = hashXY.subarray(-20).toString('hex').toLowerCase();
    return `0x${address}`;
};
const signMessage = async (message) => {
    const signature = await _signDigest(ethers_1.ethers.utils.hashMessage(ethers_1.ethers.utils.arrayify(message)));
    let signatureV = parseInt(signature.slice(-2), 16);
    if (signatureV < 27) {
        signatureV += 27;
    }
    // tx hash is signed with a prefix
    signatureV += 4;
    return signature.slice(0, -2) + signatureV.toString(16);
};
const signTypedData = async (domain, types, value) => {
    const eip712Hash = utils_1._TypedDataEncoder.hash(domain, types, value);
    return _signDigest(eip712Hash);
};
const _signDigest = async (digestString) => {
    const digestBuffer = Buffer.from(ethers_1.ethers.utils.arrayify(digestString));
    const sig = await _requestKmsSignature(digestBuffer);
    const ethAddr = await getAddress();
    const v = _determineCorrectV(digestBuffer, sig.r, sig.s, ethAddr);
    return ethers_1.ethers.utils.joinSignature({
        v,
        r: `0x${sig.r.toString('hex')}`,
        s: `0x${sig.s.toString('hex')}`
    });
};
const _requestKmsSignature = async (plaintext) => {
    const response = await _sign(plaintext);
    if (!response || !response.signature) {
        throw new Error(`GCP KMS call failed`);
    }
    return _findEthereumSig(response.signature);
};
const _findEthereumSig = async (signature) => {
    const decoded = EcdsaSigAsnParse.decode(signature, 'der');
    const { r, s } = decoded;
    const secp256k1N = new bn_js_1.default('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16); // max value on the curve
    const secp256k1halfN = secp256k1N.div(new bn_js_1.default(2)); // half of the curve
    // Because of EIP-2 not all elliptic curve signatures are accepted
    // the value of s needs to be SMALLER than half of the curve
    // i.e. we need to flip s if it's greater than half of the curve
    // if s is less than half of the curve, we're on the "good" side of the curve, we can just return
    return { r, s: s.gt(secp256k1halfN) ? secp256k1N.sub(s) : s };
};
const _determineCorrectV = (msg, r, s, expectedEthAddr) => {
    // This is the wrapper function to find the right v value
    // There are two matching signatures on the elliptic curve
    // we need to find the one that matches to our public key
    // it can be v = 27 or v = 28
    let v = 27;
    const pubKey = ethers_1.ethers.utils.recoverAddress(`0x${msg.toString('hex')}`, {
        r: `0x${r.toString('hex')}`,
        s: `0x${s.toString('hex')}`,
        v
    });
    if (pubKey.toLowerCase() !== expectedEthAddr.toLowerCase()) {
        // if the pub key for v = 27 does not match
        // it has to be v = 28
        v = 28;
    }
    return v;
};
const _sign = async (digest) => {
    const [asymmetricSignResponse] = await kms.asymmetricSign({
        name: versionName,
        digest: {
            sha256: digest
        }
    });
    return asymmetricSignResponse;
};
const _displayAddress = async () => {
    try {
        logger_1.default.info(`Using GCL KMS signer address: ${await getAddress()}`);
    }
    catch (error) {
        logger_1.default.error(`GCP KMS display address: ${error.message}`);
    }
};
_displayAddress();
exports.default = {
    isGcpKmsSetup,
    getPublicKey,
    getAddress,
    signMessage,
    signTypedData
};
//# sourceMappingURL=googleCloudKmsService.js.map