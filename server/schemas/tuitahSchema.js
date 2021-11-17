const { Joi } = require("express-validation");

const tuitahValidation = {
  body: Joi.object({
    text: Joi.string().max(200).required(),
  }),
};

module.exports = tuitahValidation;
