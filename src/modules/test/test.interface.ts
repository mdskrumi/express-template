import { Document, Types } from 'mongoose';
import { TestEnum } from '@/modules/test/test.enum';

export default interface Test extends Document {
    _id: Types.ObjectId;
    title: string;
    type?: TestEnum;
}
