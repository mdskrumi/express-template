import { Schema, model } from 'mongoose';

import Test from '@/modules/test/test.interface';
import { TestEnum } from '@/modules/test/test.enum';

const TestSchema = new Schema<Test>(
    {
        title: {
            type: Schema.Types.String,
            required: true,
        },

        type: {
            type: Schema.Types.String,
            enum: TestEnum,
            default: TestEnum.TestEnum1,
        },
    },
    { timestamps: true }
);

export default model<Test>('Test', TestSchema);
