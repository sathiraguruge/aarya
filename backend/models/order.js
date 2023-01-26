const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/user");
const { Item } = require("../models/item");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      item: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Completed", "Cancelled", "Refunded"],
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
});

orderSchema.methods.isUserValid = async function () {
  const user = await User.findById(this.user);
  if (!user) return false;

  return true;
};

orderSchema.methods.isItemsValid = async function () {
  for (let item of this.items) {
    let itemId = item.item;
    if (!(await Item.findById(itemId))) return false;
  }
  return true;
};

function validateSchema(order) {
  const joiSchema = Joi.object({
    user: Joi.objectId().required(),
    items: Joi.array().items({
      item: Joi.objectId().required(),
      quantity: Joi.number().optional(),
    }),
    orderDate: Joi.date().optional(),
    status: Joi.string().optional,
    totalPrice: Joi.number().optional(),
  });

  const error = joiSchema.validate(order);
  return error;
}

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
module.exports.validateSchema = validateSchema;
