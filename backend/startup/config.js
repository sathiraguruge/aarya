const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey"))
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");

  const { url, name } = config.get("db");
  if (!url) {
    throw new Error("FATAL ERROR: db.url is not defined");
  }
  if (!name) {
    throw new Error("FATAL ERROR: db.name is not defined");
  }
};
