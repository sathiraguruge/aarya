const express = require("express");
const sanitize = require("mongo-sanitize");
const router = express.Router();
const { Order, validateSchema } = require("../models/order");
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

router.post("/", auth, async (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order(req.body);

  if (!(await order.isUserValid()))
    return res.status(404).send("User not found!");

  if (!(await order.isItemsValid()))
    return res.status(404).send("Item not found!");

  await order.save();
  res.status(200).send(order);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const id = sanitize(req.params.id);

  const order = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!order)
    return res.status(404).send("The order with the given ID was not found");
  res.status(200).send(order);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found");
  res.status(200).send();
});

module.exports = router;
