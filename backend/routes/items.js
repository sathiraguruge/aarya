const express = require("express");
const router = express.Router();
const { Item } = require("../models/item");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const items = await Item.find().sort("name");
  res.status(200).send(items);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send("Item not found ");

  res.status(200).send(item);
});

module.exports = router;
