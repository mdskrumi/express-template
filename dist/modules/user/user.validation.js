"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required().messages({
        'string.min': 'Name should be minimum 3 characters',
        'string.max': 'Name should be maximum 30 characters',
        'any.required': 'Name is required',
    }),
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.email': 'must be a valid email',
        'any.required': 'Email is required',
    }),
    phone: joi_1.default.string()
        .length(11)
        .pattern(/^01[0-9]+$/)
        .required()
        .messages({
        'any.required': 'Phone number is required',
        'string.pattern.base': 'Invalid phone number',
        'string.length': 'Invalid phone number',
    }),
    role: joi_1.default.string(),
    password: joi_1.default.string()
        .pattern(/^[A-Za-z0-9_]\w{3,9}$/)
        .required()
        .messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must be between 4 to 10 characters and consisting of numbers or letters',
    }),
});
const login = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.email': 'must be a valid email',
        'string.required': 'Email is required',
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required',
    }),
});
exports.default = { create, login };
