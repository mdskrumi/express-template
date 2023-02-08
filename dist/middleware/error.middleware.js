"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, _next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
