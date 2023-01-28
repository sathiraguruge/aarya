const mongoose = require("mongoose");
const config = require("config");
module.exports = function () {
  const { url, name } = config.get("db");

  mongoose
    .connect(`${url}/${name}`)
    .then(() => {
      console.log("Connected to MongoDB server");
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB server", err);
    });
};
