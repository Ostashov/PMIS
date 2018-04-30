// Dependencies
var config = require("./config");
var routes = require("./../routes/routes");
var express = require("express");
var bodyParser = require("body-parser");

var initApp = function() {
  // Init
  var app = express();

  // Config
  app.set("port", config.PORT);

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("./public"));

  // Setup routes
  routes(app);

  return app;
};

module.exports = initApp;
