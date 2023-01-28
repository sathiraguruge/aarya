const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 10,
  },
  lastname: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 10,
  },
  phone: {
    required: false,
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  address: {
    required: false,
    type: String,
    minlength: 8,
    maxlength: 50,
  },
  zipcode: {
    required: false,
    type: Number,
    validator: Number.isInteger,
  },
  email: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

userSchema.methods.userExists = async function () {
  const user = await User.findOne({ email: this.email });
  if (user) return true;
  return false;
};

userSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  password = await bcrypt.hash(password, salt);
  return password;
};

function validateSchema(user) {
  const joiSchema = Joi.object({
    firstname: Joi.string().min(5).max(10).required(),
    lastname: Joi.string().min(5).max(10).required(),
    phone: Joi.string().min(10).max(10).optional(),
    address: Joi.string().min(8).max(50).optional(),
    zipcode: Joi.number().integer().optional(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).required(),
  });

  const error = joiSchema.validate(user);
  return error;
}

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validateSchema = validateSchema;
