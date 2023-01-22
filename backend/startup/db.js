const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  mongoose
    .connect(config.get("db_url"))
    .then(() => {
      console.log("Connected to MongoDB server");
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB server", err);
    });
};
