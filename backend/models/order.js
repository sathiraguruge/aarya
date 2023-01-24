const mongoose = require("mongoose");

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
    required: true,
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
