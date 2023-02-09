import { Schema, model } from 'mongoose';

import Dog from '@/modules/dog/dog.interface';
import { DogEnum } from '@/modules/dog/dog.enum';

const DogSchema = new Schema<Dog>(
    {
        title: {
            type: Schema.Types.String,
            required: true,
        },

        type: {
            type: Schema.Types.String,
            enum: DogEnum,
            default: DogEnum.DogEnum1,
        },
    },
    { timestamps: true }
);

export default model<Dog>('Dog', DogSchema);
