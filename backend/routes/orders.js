const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("items.item").sort("-orderDate");
  res.status(200).send(orders);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const orders = await Order.find({
    user: req.params.id,
  })
    .populate("items.item")
    .sort("-orderDate");
  res.status(200).send(orders);
});

router.post("/", async (req, res) => {
  const order = new Order(req.body);

  if (!(await order.isUserValid()))
    return res.status(404).send("User not found!");

  if (!(await order.isItemsValid()))
    return res.status(404).send("Item not found!");

  await order.save();
  res.status(200).send(order);
});

module.exports = router;
