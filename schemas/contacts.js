const Joi = require("joi");

const { emailValidator } = require("../constants/contact-constants");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name field should be a string",
  }),
  email: Joi.string().pattern(emailValidator).optional().messages({
    "string.base": "email field should be a string",
    "string.email": "email field should be a valid email address",
  }),
  phone: Joi.string().optional().messages({
    "string.base": "phone number field should be a string",
  }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
