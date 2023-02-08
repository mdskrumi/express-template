import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';

import Test from '@/modules/test/test.interface';
import TestService from '@/modules/test/test.service';

import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/modules/test/test.validation';

import HttpException from '@/utils/exceptions/http.exception';
import { isUserAuthenticated } from '@/middleware/auth.middleware';

class UserController implements Controller {
    public path = '/test';
    public router = Router();
    private testService = new TestService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.post),
            this.post
        );
        this.router.get(
            `${this.path}`,
            // isUserAuthenticated,
            this.get
        );
    }

    private post = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const requestBody = req.body as Test;
            const test = await this.testService.create(requestBody);
            res.status(200).json({
                message: 'success',
                data: test,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot create test'
                )
            );
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const tests = await this.testService.get();
            res.status(200).json({
                message: 'success',
                data: tests,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot get tests'
                )
            );
        }
    };
}

export default UserController;
