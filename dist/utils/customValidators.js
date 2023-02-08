"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdValidator = void 0;
const mongoose_1 = require("mongoose");
function ObjectIdValidator(value, helper) {
    if (!(0, mongoose_1.isValidObjectId)(value)) {
        return helper.message({ 'custom': `Invalid ObjectId ${value}` });
    }
    else {
        return value;
    }
}
exports.ObjectIdValidator = ObjectIdValidator;
