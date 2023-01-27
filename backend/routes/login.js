const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { User } = require("../models/user");

const saltRounds = 10;

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid Username/password");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send("Invalid Username/password");
  }
  const token = user.generateAuthToken();
  return res.status(200).header("x-auth-token", token).send(200);
});

module.exports = router;
