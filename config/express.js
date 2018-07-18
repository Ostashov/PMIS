// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var FileStore = require("session-file-store")(session);

var config = require("./config");
var routes = require("./../routes/routes");
var csv = require("express-csv");

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

  if (process.env.NODE_ENV == "production") {
    mongoose.connect(config.MONGO_URL);
    // sessions in production mode
    app.use(
      session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      })
    );
  } else {
    // sessions in development mode
    app.use(
      session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new FileStore() // storing in the files
      })
    );
  }

  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("./public"));

  // Setup routes
  routes(app);

  return app;
};

module.exports = initApp;
