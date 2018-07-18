module.exports = function(app) {
  // localhost:port/api/
  app.use("/api", require("./api.routes"));

  // localhost:port/
  app.use("/", require("./web.routes"));
};
