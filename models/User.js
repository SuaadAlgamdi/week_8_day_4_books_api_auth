const mongoose = require("mongoose")
const Joi = require("joi")

const userShema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatar: String,
})

const signupJoi = Joi.object({
  firstName: Joi.string().min(2).max(120).required(),
  lastName: Joi.string().min(2).max(120).required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().min(6).max(120).required(),
  avatar: Joi.string().uri().max(1000),
})

const loginJoi = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().min(6).max(120).required(),
})
const User = mongoose.model("User", userShema)

module.exports.User = User
module.exports.signupJoi = signupJoi
module.exports.loginJoi = loginJoi
