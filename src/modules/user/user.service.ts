import bcrypt from 'bcrypt';

import UserModel from '@/modules/user/user.model';
import User from '@/modules/user/user.interface';
import HttpException from '@/utils/exceptions/http.exception';
import { signJwt } from '@/utils/jwt.utils';

class UserService {
    private user = UserModel;

    /**
     * Create a new user
     */
    public async create({
        name,
        email,
        phone,
        role,
        password,
    }: User): Promise<User> {
        try {
            const user = await this.user.findOne({ email });
            if (user) {
                throw new HttpException(
                    409,
                    'This email is already registered'
                );
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hashSync(password, salt);

            return await this.user.create({
                name,
                email,
                phone,
                role,
                password: hash,
            });
        } catch (error: HttpException | any) {
            throw error;
        }
    }

    public async login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const user = await this.user.findOne({ email });
        if (!user) {
            throw new HttpException(400, 'Email not found');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new HttpException(400, 'Creadential is not matching');
        }
        const accessToken = signJwt({ ...user });
        return {
            user,
            accessToken,
        };
    }
}

export default UserService;
