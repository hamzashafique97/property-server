const mongooose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongooose.Schema({
  name: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const validateUser = Joi.object().keys({
  name: Joi.string().required(),
  userType: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const User = mongooose.model("user", userSchema);

module.exports = { User, validateUser };
