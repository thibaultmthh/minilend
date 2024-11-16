"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapController(controllerFunction) {
    return async (req, res, next) => {
        try {
            await controllerFunction(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = wrapController;
//# sourceMappingURL=wrapController.js.map