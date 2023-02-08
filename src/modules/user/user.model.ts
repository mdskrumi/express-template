import { Schema, model } from 'mongoose';

import User from '@/modules/user/user.interface';
import { Role } from '@/modules/user/user.enum';

const UserSchema = new Schema<User>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            required: true,
        },
        phone: {
            type: Schema.Types.String,
            required: true,
        },
        role: {
            type: Schema.Types.String,
            enum: Role,
            default: Role.User,
        },

        password: {
            type: Schema.Types.String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<User>('User', UserSchema);
