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
const test_model_1 = __importDefault(require("@/modules/test/test.model"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
class UserService {
    constructor() {
        this.test = test_model_1.default;
    }
    create(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.test.create(test);
            }
            catch (error) {
                throw error;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.test.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    getbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.test.findOne({ _id: id });
            }
            catch (error) {
                throw new http_exception_1.default(404, 'Can not get the item');
            }
        });
    }
    deletebyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.test.findOneAndRemove({ _id: id });
            }
            catch (error) {
                throw new http_exception_1.default(400, 'Can not remove the item');
            }
        });
    }
}
exports.default = UserService;
