"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        APP_ENV: (0, envalid_1.str)({
            choices: ['development', 'staging', 'production'],
        }),
        MONGO_PATH: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 3000 }),
    });
}
exports.default = validateEnv;
