"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBase64Url = void 0;
const base64ToBase64Url = (base64) => {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
exports.base64ToBase64Url = base64ToBase64Url;
//# sourceMappingURL=utils.js.map