const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Item } = require("../models/item");

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
  if (!mongoose.Types.ObjectId.isValid(this.user)) return false;
  const user = await User.findById(this.user);
  if (!user) return false;

  return true;
};

orderSchema.methods.isItemsValid = async function () {
  for (let item of this.items) {
    let itemId = item.item;
    if (!mongoose.Types.ObjectId.isValid(itemId)) return false;
    if (!(await Item.findById(itemId))) return false;
  }
  return true;
};

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
