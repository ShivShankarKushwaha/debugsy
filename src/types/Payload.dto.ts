import Joi from 'joi';

export const LoginPayload = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

export const SignUpPayload = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
	role: Joi.string().valid('Developer', 'Manager').required(),
	password: Joi.string().min(6).required(),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
		'any.only': 'Passwords do not match'
	})
});
