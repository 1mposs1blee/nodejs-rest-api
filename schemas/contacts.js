const Joi = require("joi");

const post = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const put = Joi.object().or("name", "email", "phone").required().keys({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { post, put };
