import Joi from 'joi';

export const registerUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).message("Password must be at least 6 characters").required(),
  confirmPassword: Joi.string().min(6).message("Password must be at least 6 characters").required(),
  username: Joi.string().required(),
  role: Joi.string().valid('user', 'admin', 'seller'),
  phoneNumber: Joi.number().required()
});

export const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).message("Password must be at least 6 characters").required()
});

export const resetLink = Joi.object({
  email: Joi.string().email().required()
});