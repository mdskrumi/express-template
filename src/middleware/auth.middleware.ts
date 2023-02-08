import { extractToken, verifyJwt } from '@/utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';
import UserModel from '@/modules/user/user.model';

export const isUserAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN: authorization token required',
        });
    } else {
        try {
            const verify = verifyJwt(token);
            //@ts-ignore
            const user = await UserModel.findById(verify?.decoded?._id);
            if (user) {
                //@ts-ignore
                req.user = { id: user?._id };
                next();
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'UNAUTHORIZED',
                });
            }
        } catch (error) {
            return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED',
            });
        }
    }
};
