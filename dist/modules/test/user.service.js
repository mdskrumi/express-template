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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("@/modules/user/user.model"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const jwt_utils_1 = require("@/utils/jwt.utils");
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    /**
     * Create a new user
     */
    create({ name, email, phone, role, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({ email });
                if (user) {
                    throw new http_exception_1.default(409, 'This email is already registered');
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hashSync(password, salt);
                return yield this.user.create({
                    name,
                    email,
                    phone,
                    role,
                    password: hash,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    login({ email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findOne({ email });
            if (!user) {
                throw new http_exception_1.default(400, 'Email not found');
            }
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isValid) {
                throw new http_exception_1.default(400, 'Creadential is not matching');
            }
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign({}, user));
            return {
                user,
                accessToken,
            };
        });
    }
}
exports.default = UserService;
