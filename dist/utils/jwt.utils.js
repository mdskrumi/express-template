"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(object, options) {
    const { PRIVATE_KEY } = process.env;
    const signingKey = Buffer.from(PRIVATE_KEY, 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256', allowInsecureKeySizes: true }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    try {
        const { PUBLIC_KEY } = process.env;
        const signingKey = Buffer.from(PUBLIC_KEY, 'base64').toString('ascii');
        const decoded = jsonwebtoken_1.default.verify(token, signingKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
function extractToken(req) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) &&
        ((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[0]) === 'Bearer') {
        return (_e = (_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d.authorization) === null || _e === void 0 ? void 0 : _e.split(' ')[1];
    }
    else if ((req === null || req === void 0 ? void 0 : req.query) && ((_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.token)) {
        return (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.token;
    }
    return null;
}
exports.extractToken = extractToken;
