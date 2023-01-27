const rateLimit = require("express-rate-limit");
const config = require("config");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: config.get("rateLimit.max"),
});

module.exports = limiter;
