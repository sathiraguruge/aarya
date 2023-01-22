const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey"))
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");

  if (!config.get("db_url"))
    throw new Error("FATAL ERROR: db_url is not defined");
};
