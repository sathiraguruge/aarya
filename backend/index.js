require("express-async-errors");
const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
