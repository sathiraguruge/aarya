const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://0.0.0.0/aarya_dev")
    .then(() => {
      console.log("Connected to MongoDB server");
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB server", err);
    });
};
