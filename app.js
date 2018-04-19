const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const pg = require("pg");
const pg_connect = {
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port_pg
};

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// var pool = new pg.Pool(pg_connect);

app.get("/", (req, res) => {
  var pool = new pg.Pool(pg_connect);
  const results = [];
  pool.connect(function(err, client, done) {
    // Handle connection errors
    if (err) {
      console.log(err);
      done();
      return res.status(500).json({ success: false, data: err });
    } else {
      res.render("index", { users: results });
      // client
      //   .query("SELECT * FROM users")
      //   .then(result => {
      //     result.rows.forEach(function(item) {
      //       results.push(item);
      //     });
      //     res.render("index", { users: results });
      //   })
      //   .catch(err => console.log(err));
      done();
    }
  });
});

app.get("/register", (req, res) => res.render("register")); // res.send("Hello World! What\'s up!"))
app.post("/register", (req, res) => {
  console.log(req.body);

  res.redirect("/register");
});

module.exports = app;
