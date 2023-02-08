import jwt from 'jsonwebtoken';

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const { PRIVATE_KEY } = process.env;
    const signingKey = Buffer.from(PRIVATE_KEY as string, 'base64').toString(
        'ascii'
    );

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
        allowInsecureKeySizes: true,
    });
}

export function verifyJwt(token: string) {
    try {
        const { PUBLIC_KEY } = process.env;
        const signingKey = Buffer.from(PUBLIC_KEY as string, 'base64').toString(
            'ascii'
        );
        const decoded = jwt.verify(token, signingKey as string);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        };
    }
}

export function extractToken(req: any) {
    if (
        req?.headers?.authorization &&
        req?.headers?.authorization?.split(' ')[0] === 'Bearer'
    ) {
        return req?.headers?.authorization?.split(' ')[1];
    } else if (req?.query && req?.query?.token) {
        return req?.query?.token;
    }
    return null;
}
