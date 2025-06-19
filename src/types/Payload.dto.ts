import Joi from 'joi';

export const LoginPayload = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

export const SignUpPayload = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Z0-9\s]+$/)
		.min(5)
		.max(50)
		.required(),
	email: Joi.string().email().required(),
	// role: Joi.string().optional(),
	password: Joi.string().min(6).required(),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
		'any.only': 'Passwords do not match'
	})
});
