import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/modules/user/user.validation';
import UserService from '@/modules/user/user.service';
import User from '@/modules/user/user.interface';
import { signJwt } from '@/utils/jwt.utils';
import HttpException from '@/utils/exceptions/http.exception';

class UserController implements Controller {
    public path = '/user';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const requestBody = req.body as User;
            const user = await this.userService.create(requestBody);
            res.status(201).json({
                message: 'user created',
                data: user,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot create user'
                )
            );
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const requestBody = req.body as User;
            const user = await this.userService.login(requestBody);
            res.status(201).json({
                message: 'login successful',
                data: user,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(400, error.message || 'Cannot validate User')
            );
        }
    };
}

export default UserController;
