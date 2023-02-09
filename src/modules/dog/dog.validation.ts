import Joi from 'joi';
import Dog from '@/modules/dog/dog.interface';

const post = Joi.object<Dog>({
    title: Joi.string().min(3).required().messages({
        'any.required': 'title is required',
        'string.min': 'title should be minimum 3 characters',
    }),
});

export default { post };
