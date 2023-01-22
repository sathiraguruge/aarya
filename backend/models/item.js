const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 40,
  },
  price: {
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
    type: String,
  },
  tags: [{ type: String }],
});

const Item = mongoose.model("Item", itemSchema);

module.exports.Item = Item;
