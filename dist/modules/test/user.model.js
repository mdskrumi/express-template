"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const test_enum_1 = require("@/modules/test/test.enum");
const TestSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    type: {
        type: mongoose_1.Schema.Types.String,
        enum: test_enum_1.TestEnum,
        default: test_enum_1.TestEnum.TestEnum1,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Test', TestSchema);
