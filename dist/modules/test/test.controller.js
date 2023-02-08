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
const test_service_1 = __importDefault(require("@/modules/test/test.service"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const test_validation_1 = __importDefault(require("@/modules/test/test.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
class UserController {
    constructor() {
        this.path = '/test';
        this.router = (0, express_1.Router)();
        this.testService = new test_service_1.default();
        this.post = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const test = yield this.testService.create(requestBody);
                res.status(200).json({
                    message: 'success',
                    data: test,
                });
            }
            catch (error) {
                next(new http_exception_1.default(error.status, error.message || 'Cannot create test'));
            }
        });
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield this.testService.get();
                res.status(200).json({
                    message: 'success',
                    data: tests,
                });
            }
            catch (error) {
                next(new http_exception_1.default(error.status, error.message || 'Cannot get tests'));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(test_validation_1.default.post), this.post);
        this.router.get(`${this.path}`, 
        // isUserAuthenticated,
        this.get);
    }
}
exports.default = UserController;
