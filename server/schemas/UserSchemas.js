import Joi from 'joi';

export const UserCreateSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        image: Joi.string()
    }
});

export const UserLogInSchema = Joi.object({
    body: {
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    }
})