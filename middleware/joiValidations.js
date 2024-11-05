const Joi = require("joi");

const tokenSchema = Joi.object({
  token: Joi.string().required(),
}).unknown(true);

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(true);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const invoiceSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  total: Joi.number().min(1).required(),
  items: Joi.array()
    .required()
    .items(
      Joi.object()
        .required()
        .keys({
          description: Joi.string().required(),
          price: Joi.number().min(1).required(),
          quantity: Joi.number().min(1).required(),
          amount: Joi.number().min(1).required(),
        })
        .unknown(true)
    )
    .required(),
}).unknown(true);

module.exports = {
  registerSchema,
  loginSchema,
  tokenSchema,
  invoiceSchema,
};
