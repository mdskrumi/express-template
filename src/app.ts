import express, { Application } from 'express';
import mongoose from 'mongoose';

import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';

const numCPUs = cpus().length;

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors({ credentials: true, origin: true }));
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(cookieParser());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private async initialiseDatabaseConnection(): Promise<void> {
        const { MONGO_PATH } = process.env;
        try {
            await mongoose.connect(`${MONGO_PATH}`);
        } catch (error) {
            throw error;
        }
    }

    public listen(): void {
        const { APP_ENV = 'development' } = process.env;
        if (cluster.isPrimary) {
            console.log(`Primary ${process.pid} is running`);
            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        } else {
            this.express.listen(this.port, () => {
                console.log(
                    `App listening on the port ${this.port}. Environment: ${APP_ENV}`
                );
                console.log(`Worker ${process.pid} started`);
            });
        }
    }
}

export default App;
