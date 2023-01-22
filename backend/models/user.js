const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var config = require("config");

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
    minlength: 10,
    maxlength: 10,
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

const User = mongoose.model("User", userSchema);

module.exports.User = User;
