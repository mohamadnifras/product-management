import Joi from "joi";

const signUpValidation = Joi.object({
    name : Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.min': '"username" must be at least 3 characters long',
      'string.max': '"username" cannot be more than 20 characters',
      "any.required": `"username" is a required field`,
    }),

    email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '"Email" must be a valid email address',
      'any.required': '"Email" is a required field',
    }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': '"Password" must be at least 8 characters long',
      'any.required': '"Password" is a required field',
    }),
});


const signInValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'string.empty': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
    }),
})


export {signInValidation,signUpValidation}