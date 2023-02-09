import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';

import Dog from '@/modules/dog/dog.interface';
import DogService from '@/modules/dog/dog.service';

import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/modules/dog/dog.validation';

import HttpException from '@/utils/exceptions/http.exception';
import { isUserAuthenticated } from '@/middleware/auth.middleware';

class DogController implements Controller {
    public path = '/dog';
    public router = Router();
    private dogService = new DogService();

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

        this.router.get(
            `${this.path}/:id`,
            // isUserAuthenticated,
            this.getbyId
        );
        this.router.delete(
            `${this.path}/:id`,
            // isUserAuthenticated,
            this.deletebyId
        );
    }

    private post = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const requestBody = req.body as Dog;
            const dog = await this.dogService.create(requestBody);
            res.status(200).json({
                message: 'success',
                data: dog,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot create dog'
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
            const dogs = await this.dogService.get();
            res.status(200).json({
                message: 'success',
                data: dogs,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot get dogs'
                )
            );
        }
    };

    private getbyId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const dog = await this.dogService.getbyId(req.params.id);
            res.status(200).json({
                message: 'success',
                data: dog,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot get dog'
                )
            );
        }
    };

    private deletebyId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const dog = await this.dogService.deletebyId(req.params.id);
            res.status(200).json({
                message: 'success',
                data: dog,
            });
        } catch (error: Error | any) {
            next(
                new HttpException(
                    error.status,
                    error.message || 'Cannot remove dog'
                )
            );
        }
    };
}

export default DogController;
