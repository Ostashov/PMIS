// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Dependencies
var config = require("./config/config");
var express = require("./config/express");

// Create server
var app = express();

const port = config.PORT;

app.listen(port, () => {
  console.log("listening on port " + port);
});

// database()
//   .then(info => {
//     console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
//     app.listen(config.PORT, () =>
//       console.log(`Example app listening on port ${config.PORT}!`)
//     );
//   })
//   .catch(() => {
//     console.error("Unable to connect to database");
//     process.exit(1);
//   });
