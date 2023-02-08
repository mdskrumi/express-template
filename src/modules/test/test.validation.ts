import Joi from 'joi';
import Test from '@/modules/test/test.interface';

const post = Joi.object<Test>({
    title: Joi.string().min(3).required().messages({
        'any.required': 'title is required',
        'string.min': 'title should be minimum 3 characters',
    }),
});

export default { post };
