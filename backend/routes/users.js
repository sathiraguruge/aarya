const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const saltRounds = 10;

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const user = await new User(req.body);

  if (await user.userExists()) {
    return res.status(400).send("User already registered");
  }

  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  return res.header("x-auth-token", token).send(200);
});

module.exports = router;
