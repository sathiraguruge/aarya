const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 40,
  },
  price: {
    required: false,
    type: Number,
    default: 0,
  },
  description: {
    required: false,
    type: String,
    minlength: 10,
    maxlength: 50,
  },
  image: {
    required: false,
    type: String,
  },
  tags: [{ required: false, type: String }],
});

function validateSchema(item) {
  const joiSchema = Joi.object({
    name: Joi.string().min(5).max(40).required(),
    price: Joi.number().optional(),
    description: Joi.string().min(10).max(50).required(),
    image: Joi.string().optional(),
    tags: Joi.array().items(Joi.string().optional()),
  });

  const error = joiSchema.validate(item, { escapeHtml: true });
  return error;
}

const Item = mongoose.model("Item", itemSchema);

module.exports.validateSchema = validateSchema;
module.exports.Item = Item;
