"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_enum_1 = require("@/modules/user/user.enum");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        required: true,
    },
    phone: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    role: {
        type: mongoose_1.Schema.Types.String,
        enum: user_enum_1.Role,
        default: user_enum_1.Role.User,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
