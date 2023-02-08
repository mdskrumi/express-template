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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = require("node:os");
const node_process_1 = __importDefault(require("node:process"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
const numCPUs = (0, node_os_1.cpus)().length;
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    initialiseMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)({ credentials: true, origin: true }));
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use((0, cookie_parser_1.default)());
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const { MONGO_PATH } = node_process_1.default.env;
            try {
                yield mongoose_1.default.connect(`${MONGO_PATH}`);
            }
            catch (error) {
                throw error;
            }
        });
    }
    listen() {
        const { APP_ENV = 'development' } = node_process_1.default.env;
        if (node_cluster_1.default.isPrimary) {
            console.log(`Primary ${node_process_1.default.pid} is running`);
            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                node_cluster_1.default.fork();
            }
            node_cluster_1.default.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        }
        else {
            this.express.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}. Environment: ${APP_ENV}`);
                console.log(`Worker ${node_process_1.default.pid} started`);
            });
        }
    }
}
exports.default = App;
