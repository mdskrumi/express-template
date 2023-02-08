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
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = __importDefault(require("@/modules/user/user.validation"));
const user_service_1 = __importDefault(require("@/modules/user/user.service"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
class UserController {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const user = yield this.userService.create(requestBody);
                res.status(201).json({
                    message: 'user created',
                    data: user,
                });
            }
            catch (error) {
                next(new http_exception_1.default(error.status, error.message || 'Cannot create user'));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const user = yield this.userService.login(requestBody);
                res.status(201).json({
                    message: 'login successful',
                    data: user,
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message || 'Cannot validate User'));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.create), this.create);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
    }
}
exports.default = UserController;
