const express = require("express");
const cors = require("cors");
const items = require("../routes/items");
const users = require("../routes/users");
const login = require("../routes/login");
const orders = require("../routes/orders");
const error = require("../middleware/error");
const limiter = require("../middleware/ratelimiter");

module.exports = function (app) {
  app.use(cors());
  app.use(limiter);
  app.use(express.json());
  app.use("/api/items", items);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use("/api/orders", orders);
  app.use(error);
};
