const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("items.item").sort("-orderDate");
  res.status(200).send(orders);
});

router.get("/:id", async (req, res) => {
  const orders = await Order.find({
    user: mongoose.Types.ObjectId(req.params.id),
  })
    .populate("items.item")
    .sort("-orderDate");
  res.status(200).send(orders);
});

module.exports = router;
