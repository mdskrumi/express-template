"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthenticated = void 0;
const jwt_utils_1 = require("@/utils/jwt.utils");
const user_model_1 = __importDefault(require("@/modules/user/user.model"));
const isUserAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (0, jwt_utils_1.extractToken)(req);
    if (!token) {
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN: authorization token required',
        });
    }
    else {
        try {
            const verify = (0, jwt_utils_1.verifyJwt)(token);
            //@ts-ignore
            const user = yield user_model_1.default.findById((_a = verify === null || verify === void 0 ? void 0 : verify.decoded) === null || _a === void 0 ? void 0 : _a._id);
            if (user) {
                //@ts-ignore
                req.user = { id: user === null || user === void 0 ? void 0 : user._id };
                next();
            }
            else {
                return res.status(401).json({
                    status: 401,
                    message: 'UNAUTHORIZED',
                });
            }
        }
        catch (error) {
            return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED',
            });
        }
    }
});
exports.isUserAuthenticated = isUserAuthenticated;
