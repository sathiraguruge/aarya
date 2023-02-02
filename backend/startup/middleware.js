module.exports = function (app) {
  require("../middleware/cors")(app);
  require("../middleware/ratelimiter")(app);
};
