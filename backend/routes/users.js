const express = require("express");
const bcrypt = require("bcryptjs");
const sanitize = require("mongo-sanitize");
const validator = require("validator");
const { User, validateSchema } = require("../models/user");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const saltRounds = 10;

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateSchema(req.body);
  if (error)
    return res.status(400).send(validator.escape(error.details[0].message));

  const user = new User(req.body);

  if (await user.userExists()) {
    return res.status(400).send("User already registered");
  }

  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  return res.header("x-auth-token", token).send(200);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const requestBody = sanitize(req.body);
  const { error } = validateSchema(requestBody);
  if (error)
    return res.status(400).send(validator.escape(error.details[0].message));
  const id = sanitize(req.params.id);
  const user = await User.findByIdAndUpdate(id, requestBody, {
    new: true,
  });
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.status(200).send(user);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.status(200).send();
});

module.exports = router;
