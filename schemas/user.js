const Joi = require("joi");
const { emailValidator } = require("../constants/contact-constants");
const { subscriptions } = require("../constants/user-constants");

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailValidator).required().messages({
    "string.base": "email field should be a string",
    "string.email": "email field should be a valid email address",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "password field should be a string",
  }),
  subscription: Joi.string()
    .valid(...subscriptions)
    .messages({
      "any.only": `Subscription can only be of the following types: ${subscriptions} `,
    }),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailValidator).required().messages({
    "string.base": "email field should be a string",
    "string.email": "email field should be a valid email address",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "password field should be a string",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .messages({
      "any.only": `Subscription can only be of the following types: ${subscriptions} `,
    }),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  updateSubscriptionSchema,
};
