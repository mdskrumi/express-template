"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const post = joi_1.default.object({
    title: joi_1.default.string().min(3).required().messages({
        'any.required': 'title is required',
        'string.min': 'title should be minimum 3 characters',
    }),
});
exports.default = { post };
