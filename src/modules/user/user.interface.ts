import { Document, Types } from 'mongoose';
import { Role } from '@/modules/user/user.enum';

export default interface User extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    role?: Role;
    password: string;
}
