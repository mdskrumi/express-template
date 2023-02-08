import Joi from 'joi';
import User from '@/modules/user/user.interface';

const create = Joi.object<User>({
    name: Joi.string().min(3).max(30).required().messages({
        'string.min': 'Name should be minimum 3 characters',
        'string.max': 'Name should be maximum 30 characters',
        'any.required': 'Name is required',
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'must be a valid email',
            'any.required': 'Email is required',
        }),
    phone: Joi.string()
        .length(11)
        .pattern(/^01[0-9]+$/)
        .required()
        .messages({
            'any.required': 'Phone number is required',
            'string.pattern.base': 'Invalid phone number',
            'string.length': 'Invalid phone number',
        }),
    role: Joi.string(),
    password: Joi.string()
        .pattern(/^[A-Za-z0-9_]\w{3,9}$/)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.pattern.base':
                'Password must be between 4 to 10 characters and consisting of numbers or letters',
        }),
});

const login = Joi.object<User>({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'must be a valid email',
            'string.required': 'Email is required',
        }),

    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});

export default { create, login };
