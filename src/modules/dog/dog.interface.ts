import { Document, Types } from 'mongoose';
import { DogEnum } from '@/modules/dog/dog.enum';

export default interface Dog extends Document {
    _id: Types.ObjectId;
    title: string;
    type?: DogEnum;
}
