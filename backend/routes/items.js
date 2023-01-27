const express = require("express");
const sanitize = require("mongo-sanitize");
const router = express.Router();
const { Item, validateSchema } = require("../models/item");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const items = await Item.find().sort("name");
  res.status(200).send(items);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send("Item not found ");

  res.status(200).send(item);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).send(errorMessage);
  }

  const item = new Item(req.body);
  await item.save();
  res.status(200).send(item);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const requestBody = sanitize(req.body);
  const { error } = validateSchema(requestBody);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).send(errorMessage);
  }
  const id = sanitize(req.params.id);

  const item = await Item.findByIdAndUpdate(id, requestBody, {
    new: true,
  });
  if (!item)
    return res.status(404).send("The item with the given ID was not found");
  res.status(200).send(item);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item)
    return res.status(404).send("The item with the given ID was not found");
  res.status(200).send();
});

module.exports = router;
